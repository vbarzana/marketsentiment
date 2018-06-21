const _ = require('lodash');
const moment = require('moment-timezone');

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

/**
 * @class TickerService
 */
module.exports = {
  addNewsToTickers: async function (tickers) {
    let symbols = _.reduce(tickers, function (array, item) {
      return _.concat(array, [item.s]);
    }, []);

    let news;
    try {
      news = await this.loadCompanyNews(symbols);
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

  loadCompanyNews: async function (symbols, startDate, endDate) {
    startDate = startDate || START_DATE;
    endDate = endDate || END_DATE;

    let promises = [];
    let yahooFailedTickers = {};

    _.forEach(symbols, function (symbol) {
      promises.push(
        new Promise(function (resolve) {
          // Try loading the news for this ticker with Yahoo finance, otherwise fallback to IextradingService
          // YahooFinanceService.loadNewsForTicker(symbol, startDate, endDate)
          //   .then(resolve)
          //   .catch(function (err) {
          //     var msg = _.trim(err.message).substr(0, 100);
          //
          //     yahooFailedTickers[msg] = yahooFailedTickers[msg] || [];
          //     yahooFailedTickers[msg].push(symbol);
          //
          //     return IextradingService.loadNewsForTicker(symbol, startDate, endDate);
          //   })
          IextradingService.loadNewsForTicker(symbol, startDate, endDate)
            .then(resolve)
            .catch(function (err) {
              console.log('Could not load iextrading news for symbol: ', symbol, err.message);
              resolve(null);
            });
        })
      );
    });
    let response = await Promise.all(promises);
    if (!_.isEmpty(yahooFailedTickers)) {
      var msg = _.reduce(yahooFailedTickers, function (coll, val, key) {
        return coll += key + ': ' + val.join(',');
      }, '');
      console.log('Yahoo Finance news pull failed: ' + msg);
    }
    return transformDataNewsOutput(response);
  },

  doNotifyNews: async function (tickers) {
    var promises = [];
    _.forEach(tickers, (symbol) => promises.push(this.getNewsFromToday(symbol.s, symbol.news, symbol.d)));

    var responses = _.compact(await Promise.all(promises));

    responses.sort(UtilService.sortBySentiment);
    _.forEach(responses, (response, idx) => {
      if (!response || _.isEmpty(response.news)) {
        return true; // continue
      }

      DiscordService.notify(response.title, response.body || '', response.highlight, response.chart, null, response.news);
    })
  },

  isCrappyNews: function (text) {
    text = _.toString(text);
    return text.indexOf('Midday Gainers') >= 0
      || text.indexOf('Premarket Gainers') >= 0
      || text.indexOf('Premarket Losers') >= 0
      || text.indexOf('Midday Losers') >= 0;
  },

  getNewsFromToday: async function (symbol, news, details) {
    // On Monday take the news of the whole weekend
    let daysToSubtract = (new Date()).getDay() === 1 ? 3 : 1;
    var yesterday = moment().utc().subtract(daysToSubtract, 'days');
    var symbolAndExchange = _.split(symbol || item.symbol, ':');
    var cleanSymbol = _.trim(_.last(symbolAndExchange));

    let result = {
      symbol: cleanSymbol,
      exchange: _.toLower(_.first(symbolAndExchange)),
      highlight: '',
      title: `${cleanSymbol} | ${TickerService.getTickerDetailsAsString(details)}`,
      chart: `https://www.stockscores.com/chart.asp?TickerSymbol=${cleanSymbol}&TimeRange=180&Interval=d&Volume=1&ChartType=CandleStick&Stockscores=1&ChartWidth=1100&ChartHeight=480&LogScale=&Band=&avgType1=&movAvg1=&avgType2=&movAvg2=&Indicator1=None&Indicator2=None&Indicator3=None&Indicator4=None&endDate=&CompareWith=&entryPrice=&stopLossPrice=&candles=redgreen`
    };
    let promises = [];
    _.forEach(news, async (item) => {
      if (!item) return true;
      promises.push(new Promise(async (resolve) => {
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

          if (!notificationAlreadySent && matchesGoodNews && !this.isCrappyNews(item.title)) {
            resolve({
              name: item.title,
              value: `\`\`\`${item.description}\`\`\` Date: [${moment.tz(dateParsed, timezone).format('L HH:mm a')}](${item.link})`
            });

            try {
              // Notification sent, put it in the DB
              await NewsNotificationStatus.create({
                link: item.link,
                s: symbol || item.symbol
              }, function (err, response) {
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
};

async function loadTickersFromDb() {
  try {
    return await Ticker.find();
  } catch (err) {
    return [];
  }
}

function transformDataNewsOutput(data) {
  let result = {};
  _.forEach(data, function (item) {
    if (!item) return true;// continue
    result[item.s] = item.news;
  });
  return result;
}
