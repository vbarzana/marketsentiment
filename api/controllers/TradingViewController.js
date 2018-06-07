/**
 * @class TradingViewController
 */
const _ = require('lodash');
const request = require('request');

module.exports = {
  startAutoSync: async function () {
    this.autoSyncNasdaq();
    this.autoSyncOtc();
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
    return await TickerService.addNewsToTickers(tickers, true);
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
