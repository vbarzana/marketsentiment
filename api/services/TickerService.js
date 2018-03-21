const moment = require('moment');
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
        var updatedNews = symbol.news;
        _.forEach(symbol.news, function (item) {
          if (_.isEmpty(_.filter(symbolNews, {link: item.link}))) {
            updatedNews.push(item);
          }
        });
        notifyNewsFromToday(symbol.s, updatedNews, symbol.d);
        symbol.news = updatedNews;
      }
    });
    if (saveToDb) {
      await this.saveTickers(tickers);
    }
    sails.io.emit('refreshnews');
    return tickers; // with the news
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
            await Ticker.update(result, symbolObj);
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
  var today = moment().parseZone().format('L');
  let dateParsed;
  _.forEach(news, async (item) => {
    dateParsed = moment(item.date).parseZone();
    var notificationAlreadySent;
    if (dateParsed.format('L') === today) {
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
        var title = `<https://finance.yahoo.com/quote/${_.trim(_.last(_.split(symbol || item.symbol, ':')))}|${(symbol || item.symbol)} - ${getDetailsString(details)}>`;
        SlackService.notify(title, `${item.title} \n${item.description}\n<${item.link}|${dateParsed.format('L HH:mm a')}>\n`);
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
