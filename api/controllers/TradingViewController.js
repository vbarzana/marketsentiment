/**
 * @class TradingViewController
 */
const _ = require('lodash');
const PremarketController = require('./PremarketController');

module.exports = {
  startAutoSync: async function () {
    this.autoSyncNasdaq();
    PremarketController.autoSyncPremarket();
  },

  autoSyncNasdaq: async function () {
    let {
      autoSyncOnStartup,
      updateTickersInterval
    } = await SettingsService.getSettings();

    if (autoSyncOnStartup) {
      await this.pullTickersFromTradingView();

      setInterval(async () => {
        await this.pullTickersFromTradingView();
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

    let tickers = await TradingViewService.loadTickersCrossSiteScripting(tradingViewAjaxUrl, filters);
    tickers = await NewsService.addNewsToTickers(tickers);
    await NewsService.doNotifyNews(tickers);
    await TickerService.cleanupAndSaveTickersToDb(tickers);
    return tickers;
  }
};
