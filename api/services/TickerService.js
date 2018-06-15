const moment = require('moment-timezone');
const _ = require('lodash');
const NewsController = require('../controllers/NewsController');

const NEWS_UPDATE_INTERVAL = 60000 * 3;

/**
 * @class TickerService
 */
module.exports = {
  getDetailsString: getDetailsString,
  findBiggestGainers: async function () {
    return _.reduce(await Ticker.find(), function (collection, value) {
      collection.push(value.s);
      return collection;
    }, []);
  },

  doUpdate: async function () {
    let tickers = await this.addNewsToTickers(await loadTickersFromDb());
    await this.doNotifyNews(tickers);
    this.cleanupAndSaveTickersToDb(tickers);
  },

  startAutomaticNewsUpdate: async function (interval) {
    await this.doUpdate();
    clearInterval(this.newsUpdateInterval);
    let {autoSyncInterval} = await SettingsService.getSettings();


    this.newsUpdateInterval = setInterval(() => {
      this.doUpdate();
    }, interval || autoSyncInterval);
  },

  stopAutomaticNewsUpdate: function () {
    clearInterval(this.newsUpdateInterval);
  },

  addNewsToTickers: async function (tickers) {
    let symbols = _.reduce(tickers, function (array, item) {
      return _.concat(array, [item.s]);
    }, []);

    let news;
    try {
      news = await NewsController.loadCompanyNews(symbols);
    } catch (err) {
      console.log(err);
    }
    _.forEach(tickers, function (symbol) {
      let symbolNews = news[symbol.s];
      if (!_.isEmpty(symbolNews)) {
        var updatedNews = symbol.news ? _.castArray(symbol.news) : [];
        _.forEach(symbolNews, function (item) {
          if (_.isEmpty(_.filter(symbol.news, {link: item.link}))) {
            updatedNews.push(item);
          }
        });
        symbol.news = updatedNews;
      }
    });
    sails.io.emit('refreshnews');
    return tickers; // with the news
  },

  doNotifyNews: async function (tickers) {
    var promises = [];
    _.forEach(tickers, function (symbol) {
      promises.push(getNewsFromToday(symbol.s, symbol.news, symbol.d));
    });
    var responses = _.compact(await Promise.all(promises));

    responses.sort(UtilService.sortBySentiment);
    _.forEach(responses, (response, idx) => {
      if (!response || _.isEmpty(response.news)) {
        return true; // continue
      }

      if (response.exchange === 'otc') {
        DiscordService.notifyOtc(response.title, response.body || '', response.highlight, null, null, response.news);
      } else {
        DiscordService.notify(response.title, response.body || '', response.highlight, response.chart, null, response.news);
      }
    })
  },

  /**
   * Removes any ticker that hasn't had any activity during the last 5 days
   * @returns {Promise<any[]>}
   */
  cleanupTickers: async function () {
    let tickers = await loadTickersFromDb();
    let promises = [];
    _.forEach(tickers, function (ticker) {
      let fiveDaysAgo = moment().subtract(5, 'days');
      if (fiveDaysAgo > moment(_.get(ticker, 'updatedAt'))) {
        promises.push(ticker.remove());
      }
    });
    return await Promise.all(promises);
  },

  cleanupAndSaveTickersToDb: async function (tickers) {
    try {
      await this.cleanupTickers();
    } catch (err) {
    }
    await this.saveTickers(tickers);

    return tickers;
  },

  saveTickers: async function (tickers) {
    let promises = [];
    _.forEach(tickers, function (symbolObj) {
      promises.push(new Promise(async resolve => {
        let result;
        try {
          result = await Ticker.findOne({s: symbolObj.s});
          if (!result) {
            await Ticker.create(symbolObj);
          } else {
            result = _.merge(result, _.omit(symbolObj, ['id']));
            await result.save();
          }
        } catch (err) {
        }
        resolve(result);
      }));
    });
    return await Promise.all(promises);
  },

  formatNumber(num) {
    num = parseInt(num, 10);
    var isNegative = false, formattedNumber;
    if (num < 0) {
      isNegative = true
    }
    num = Math.abs(num);
    if (num >= 1000000000) {
      formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
      formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      formattedNumber = num;
    }
    if (isNegative) {
      formattedNumber = '-' + formattedNumber
    }
    return formattedNumber;
  }
};

async function getNewsFromToday(symbol, news, details) {
  // On Monday take the news of the whole weekend
  let daysToSubtract = (new Date()).getDay() === 1 ? 3 : 1;
  var yesterday = moment().utc().subtract(daysToSubtract, 'days');
  var symbolAndExchange = _.split(symbol || item.symbol, ':');
  var cleanSymbol = _.trim(_.last(symbolAndExchange));

  let result = {
    symbol: cleanSymbol,
    exchange: _.toLower(_.first(symbolAndExchange)),
    highlight: '',
    title: `${cleanSymbol} | ${getDetailsString(details)}`,
    chart: `https://www.stockscores.com/chart.asp?TickerSymbol=${cleanSymbol}&TimeRange=180&Interval=d&Volume=1&ChartType=CandleStick&Stockscores=1&ChartWidth=1100&ChartHeight=480&LogScale=&Band=&avgType1=&movAvg1=&avgType2=&movAvg2=&Indicator1=None&Indicator2=None&Indicator3=None&Indicator4=None&endDate=&CompareWith=&entryPrice=&stopLossPrice=&candles=redgreen`
  };
  let promises = [];
  _.forEach(news, async (item) => {
    if (!item) return true;
    promises.push(new Promise(async function (resolve) {
      var dateParsed = moment(item.date).utc();
      var notificationAlreadySent;
      if (dateParsed >= yesterday) {
        try {
          notificationAlreadySent = await NewsNotificationStatus.findOne({link: item.link, s: symbol || item.symbol});
        } catch (err) {
          console.log(err);
        }

        let {magicWords, timezone} = await SettingsService.getSettings() || [];

        item.description = _.toString(item.description);
        item.title = _.toString(item.title);

        let matchesGoodNews = _.isEmpty(magicWords), exp;
        _.forEach(magicWords, function (wordObj) {
          exp = new RegExp(wordObj.name, 'i');
          if (item.title.match(exp) || item.description.match(exp)) {
            result.highlight = wordObj.highlight;
            matchesGoodNews = true;
            return false; // break
          }
        });

        if (!notificationAlreadySent && matchesGoodNews && !UtilService.isCrappyNews(item.title)) {
          resolve({
            name: item.title,
            value: `\`\`\`${item.description}\`\`\` Date: [${moment.tz(dateParsed, timezone).format('L HH:mm a')}](${item.link})`
          });

          try {
            // Notification sent, put it in the DB
            await NewsNotificationStatus.create({link: item.link, s: symbol || item.symbol}, function (err, response) {
              if (err) console.log(err);
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
      resolve();
    }));
  });
  result.news = _.compact(await Promise.all(promises));
  return result;
}

function getDetailsString(details) {
  if (_.isEmpty(details)) {
    return '';
  }
  return `${details.close} Close | ${parseFloat(details.change, 10).toFixed(2)}% | ${TickerService.formatNumber(details.volume)} Vol | ${TickerService.formatNumber(details.float_shares_outstanding)} Float`;
}

async function loadTickersFromDb() {
  try {
    return await Ticker.find();
  } catch (err) {
    return [];
  }
}
