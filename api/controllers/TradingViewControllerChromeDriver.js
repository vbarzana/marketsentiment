/**
 * @class TradingViewController
 */
const _ = require('lodash');
const request = require('request');
// const {Builder} = require('selenium-webdriver');

module.exports = {
  /**
   * @method doPullTickersWithChromeDriver
   * This method should pull the tickers from tradingview by opening a chrome driver, however it is deprecated
   * because tradingview supports cross-site-scripting calls
   * @deprecated
   * @param settings
   * @returns {Promise<void>}
   */
  // doPullTickersWithChromeDriver: async function (settings) {
  //   let driver, tickers;
  //   let {
  //     tradingViewScreenerUrl,
  //     tradingViewScreenerCriteria,
  //     tradingViewAjaxUrl,
  //     tradingViewScreenerSortBy,
  //     tradingViewColumns,
  //     tradingViewScreenerOptions,
  //     tradingViewScreenerRange,
  //     tradingViewScreenerSymbols,
  //     tradingViewScreenerSleep
  //   } = settings || await SettingsService.getSettings();
	//
  //   let filters = {
  //     "filter": tradingViewScreenerCriteria,
  //     "symbols": tradingViewScreenerSymbols,
  //     "columns": tradingViewColumns,
  //     "sort": tradingViewScreenerSortBy,
  //     "options": tradingViewScreenerOptions,
  //     "range": tradingViewScreenerRange
  //   };
	//
  //   try {
  //     driver = await new Builder().forBrowser('chrome').build();
  //     await driver.get(tradingViewScreenerUrl);
  //     // Some time out so trading view does not think I am stealing their data
  //     await driver.sleep(tradingViewScreenerSleep);
	//
  //     tickers = _.get(await driver.executeAsyncScript(loadTickersDataAsync, tradingViewAjaxUrl, filters), 'data');
  //     await TickerService.addNewsToTickers(transform(tickers, tradingViewColumns), true);
  //   } finally {
  //     if (driver) {
  //       // done with the requests close the browser
  //       await driver.quit();
  //     }
  //   }
  // }
};

// function transform(tickers, columns) {
//   columns = _.castArray(columns);
//   _.forEach(tickers, function (symbolObj) {
//     // convert the symbols to object data
//     if (_.isArray(symbolObj.d)) {
//       symbolObj.d = _.reduce(symbolObj.d, function (map, item, idx) {
//         map[columns[idx]] = item;
//         return map;
//       }, {});
//     }
//   });
//   return tickers;
// }
//
// /**
//  * @param url
//  * @param queryParams
//  */
// function loadTickersDataAsync(url, queryParams) {
//   var callback = arguments[arguments.length - 1];
//   $.ajax({
//     type: 'POST',
//     url: url,
//     data: JSON.stringify(queryParams),
//     success: function (data) {
//       typeof callback === 'function' && callback(data);
//     },
//     failure: function () {
//       typeof callback === 'function' && callback(null);
//     }
//   });
// }
