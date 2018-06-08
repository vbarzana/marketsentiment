/**
 * @class TradingViewController
 */
const _ = require('lodash');
const request = require('request');

module.exports = {
  startAutoSync: async function () {
    this.autoSyncNasdaq();
    this.autoSyncOtc();
    this.autoSyncPremarket();
  },

  autoSyncNasdaq: async function () {
    let {
      autoSyncOnStartup,
      autoSyncInterval,
      updateTickersInterval
    } = await SettingsService.getSettings();

    if (autoSyncOnStartup) {
      await this.pullTickersFromTradingView();
      TickerService.startAutomaticNewsUpdate(autoSyncInterval); // 3 min

      setInterval(async () => {
        await this.pullTickersFromTradingView();
        this.startAutomaticNewsUpdate(autoSyncInterval); // 3 min
      }, updateTickersInterval); // update tickers every 1 hour
    }
  },

  autoSyncOtc: async function () {
    let otcSettings = await SettingsService.getOtcSettings();
    let {
      autoSyncOnStartup,
      autoSyncInterval,
      updateTickersInterval
    } = otcSettings;

    if (autoSyncOnStartup) {
      await this.doPullTickersFromTradingView(otcSettings);
      TickerService.startAutomaticNewsUpdate(autoSyncInterval); // 3 min

      setInterval(async () => {
        await this.doPullTickersFromTradingView(otcSettings);
        this.startAutomaticNewsUpdate(autoSyncInterval); // 3 min
      }, updateTickersInterval); // update tickers every 1 hour
    }
  },

  autoSyncPremarket: async function () {
    let premarketSettings = await SettingsService.getPremarketSettings();
    let {
      autoSyncOnStartup,
      updateTickersInterval
    } = premarketSettings;

    if (autoSyncOnStartup) {
      await this.loadPremarketTickers(premarketSettings);

      // @todo: kill interval
      setInterval(async () => {
        await this.loadPremarketTickers(premarketSettings);
      }, updateTickersInterval); // update tickers every 1 hour
    }
  },

  pullTickersFromTradingView: async function (req, res) {
    this.doPullTickersFromTradingView();

    if (res) {
      res.json({
        success: true
      });
    }
  },

  doPullTickersFromTradingView: async function (settings) {
    settings = settings || await SettingsService.getSettings();
    if (!settings) {
      console.error('Settings not provided or it could not read the settings from the database.');
      return null;
    }
    let filters = {
      "filter": _.get(settings, 'tradingViewScreenerCriteria'),
      "symbols": _.get(settings, 'tradingViewScreenerSymbols'),
      "columns": _.get(settings, 'tradingViewColumns'),
      "sort": _.get(settings, 'tradingViewScreenerSortBy'),
      "options": _.get(settings, 'tradingViewScreenerOptions'),
      "range": _.get(settings, 'tradingViewScreenerRange')
    };
    let {tradingViewAjaxUrl} = settings;

    let tickers = await loadTickersCrossSiteScripting(tradingViewAjaxUrl, filters);
    tickers = await TickerService.addNewsToTickers(tickers);
    await TickerService.doNotifyNews(tickers);
    await TickerService.cleanupAndSaveTickersToDb(tickers);
    return tickers;
  },

  loadPremarketTickers: async function (settings) {
    settings = settings || await SettingsService.getPremarketSettings();
    if (!settings) {
      console.error('Settings not provided or it could not read the settings from the database.');
      return null;
    }
    let filters = {
      "filter": _.get(settings, 'tradingViewScreenerCriteria'),
      "symbols": _.get(settings, 'tradingViewScreenerSymbols'),
      "columns": _.get(settings, 'tradingViewColumns'),
      "sort": _.get(settings, 'tradingViewScreenerSortBy'),
      "options": _.get(settings, 'tradingViewScreenerOptions'),
      "range": _.get(settings, 'tradingViewScreenerRange')
    };
    let {tradingViewAjaxUrl} = settings;

    let tickers = await loadTickersCrossSiteScripting(_.get(settings, 'tradingViewAjaxUrl'), filters);
    tickers = await TickerService.addNewsToTickers(tickers);
    _.forEach(tickers, (symbol) => {
      this.notifyPremarketNews(symbol.s, symbol.news, symbol.d);
    });
  },

  notifyPremarketNews: async function (symbol, news, details) {
    // On Monday take the news of the whole weekend
    let daysToSubtract = (new Date()).getDay() === 1 ? 3 : 1;
    var yesterday = moment().utc().subtract(daysToSubtract, 'days');
    _.forEach(news, async (item) => {
      if (!item) return true;
      var dateParsed = moment(item.date).utc();
      var notificationAlreadySent;
      if (dateParsed >= yesterday) {
        try {
          notificationAlreadySent = await NewsNotificationStatus.findOne({link: item.link, s: symbol || item.symbol});
        } catch (err) {
          console.log(err);
        }

        let {timezone} = await SettingsService.getPremarketSettings() || [];

        item.description = _.toString(item.description);
        item.title = _.toString(item.title);

        let highlight = "0xff0000";

        if (!notificationAlreadySent) {
          var symbolAndExchange = _.split(symbol || item.symbol, ':');
          var exchange = _.toLower(_.first(symbolAndExchange));
          var cleanSymbol = _.trim(_.last(symbolAndExchange));
          let msgTitle = `Premarket HOT ${cleanSymbol} ${getDetailsString(details)}`;
          let msgBody = `\n\`\`\`${item.title}\n${item.description}\nDate: ${moment.tz(dateParsed, timezone).format('L HH:mm a')}\nSource: [Yahoo Finance](${item.link})\`\`\``;
          let chart = `https://finviz.com/chart.ashx?t=${cleanSymbol}&ty=c&ta=1&p=d&s=l`;

          try {
            DiscordService.notifyPremarket(msgTitle, msgBody, highlight, chart);

            // Notification sent, put it in the DB
            await NewsNotificationStatus.create({link: item.link, s: symbol || item.symbol}, function (err, response) {
              if (err) console.log(err);
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  },


  iextradingData: async function () {
    var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5";

    return new Promise(function (resolve, reject) {
      request.get({
        url: url,

      }, function (error, response, body) {
        if (error) {
          return reject(error);
        }

        resolve(body);
      });
    });
  }
};

function transform(tickers, columns) {
  columns = _.castArray(columns);
  _.forEach(tickers, function (symbolObj) {
    // convert the symbols to object data
    if (_.isArray(symbolObj.d)) {
      symbolObj.d = _.reduce(symbolObj.d, function (map, item, idx) {
        map[columns[idx]] = item;
        return map;
      }, {});
    }
  });
  return tickers;
}

async function loadTickersCrossSiteScripting(url, queryParams) {
  return new Promise(function (resolve, reject) {
    request.post({
      url: url,
      form: JSON.stringify(queryParams)
    }, function (error, response, body) {
      if (error) {
        return reject(error);
      }
      let tickers;
      if (_.isString(body)) {
        try {
          tickers = _.get(JSON.parse(body || '{}'), 'data');
          tickers = transform(tickers, _.get(queryParams, 'columns'));
        } catch (err) {
          console.log('Could not parse tickers from trading view', body);
        }
      }
      resolve(tickers);
    });
  });
};
