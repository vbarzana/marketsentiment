const moment = require('moment-timezone');
const _ = require('lodash');

const NEWS_UPDATE_INTERVAL = 60000 * 3;

/**
 * @class TickerService
 */
module.exports = {
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
  },
  startAutomaticNewsUpdate: function (interval) {
    this.addNewsToTickers(null, true);
    clearInterval(this.newsUpdateInterval);
    this.newsUpdateInterval = setInterval(() => {
      this.addNewsToTickers(null, true); // true to save to db
    }, interval || NEWS_UPDATE_INTERVAL);
  },

  stopAutomaticNewsUpdate: function () {
    clearInterval(this.newsUpdateInterval);
  },

  addNewsToTickers: async function (tickers, saveToDb) {
    if (!tickers || _.isEmpty(tickers)) {
      tickers = await loadTickersFromDb();
    }
    let symbols = _.reduce(tickers, function (array, item) {
      return _.concat(array, [item.s]);
    }, []);

    let news;
    try {
      // news = await GoogleFinanceService.loadCompanyNews(symbols);
      news = await YahooFinanceService.loadCompanyNews(symbols);
    } catch (err) {
      console.log(err);
    }
    _.forEach(tickers, function (symbol) {
      let symbolNews = news[symbol.s];
      if (!_.isEmpty(symbolNews)) {
        var updatedNews = _.castArray(symbol.news);
        _.forEach(symbolNews, function (item) {
          if (_.isEmpty(_.filter(symbol.news, {link: item.link}))) {
            updatedNews.push(item);
          }
        });
        notifyNewsFromToday(symbol.s, updatedNews, symbol.d);
        symbol.news = updatedNews;
      }
    });
    if (saveToDb) {
      try {
        await this.cleanupTickers();
      } catch (err) {
      }
      await this.saveTickers(tickers);
    }
    sails.io.emit('refreshnews');
    return tickers; // with the news
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
  }
};

async function notifyNewsFromToday(symbol, news, details) {
  var yesterday = moment().subtract(1, 'days').format('L');
  let dateParsed;
  _.forEach(news, async (item) => {
    if (!item) return true;
    dateParsed = moment(item.date);
    var notificationAlreadySent;
    if (dateParsed.format('L') >= yesterday) {
      try {
        notificationAlreadySent = await NewsNotificationStatus.findOne({link: item.link, s: symbol || item.symbol});
      } catch (err) {
        console.log(err);
      }
      if (!notificationAlreadySent) {
        try {
          await NewsNotificationStatus.create({link: item.link, s: symbol || item.symbol}, function (err, response) {
            if (err) console.log(err);
          });
        } catch (err) {
          console.log(err);
        }
        let magicWords = ['new product', 'new investor', 'funding', 'contract', 'fda', 'nda', 'drug approval', 'blockchain',
          'Purchase Agreement', 'Earnings Call', 'fourth quarter', 'Phase 2', 'Phase 3', 'letter to shareholders',
          'raised to buy', 'beats on earnings', '8K', 'to report earnings', 'delisted', 'topline results', 'better than expected',
          'downgraded', 'bankrupcy', 'buyout', 'patent', 'merger', 'split'];
        item.description = _.toString(item.description);
        item.title = _.toString(item.title);

        let matchesGoodNews = false, exp;
        _.forEach(magicWords, function (word) {
          exp = new RegExp(word, 'i');
          if (item.title.match(exp) || item.description.match(exp)) {
            matchesGoodNews = true;
            return false; // break
          }
        });
        if (matchesGoodNews) {
          let msgTitle = `<https://finance.yahoo.com/quote/${_.trim(_.last(_.split(symbol || item.symbol, ':')))}|${(symbol || item.symbol)} - ${getDetailsString(details)}>`;
          let msgBody = `${item.title} \n${item.description}\n<${item.link}|${moment.tz(dateParsed, "America/New_York").format('L HH:mm a')}>\n`;
          SlackService.notify(msgTitle, msgBody);
        }
      }
    }
  });
}

function getDetailsString(details) {
  if (_.isEmpty(details)) {
    return '';
  }
  return `${details.close} Close - ${parseFloat(details.change, 10).toFixed(2)}% - ${TickerService.formatNumber(details.volume)} Vol - ${TickerService.formatNumber(details.float_shares_outstanding)} Float`;
}

async function loadTickersFromDb() {
  try {
    return await Ticker.find();
  } catch (err) {
    return [];
  }
}
