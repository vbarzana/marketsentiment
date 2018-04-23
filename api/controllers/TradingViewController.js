/**
 * @class TradingViewController
 */
const _ = require('lodash');
const {Builder} = require('selenium-webdriver');

module.exports = {
  pullTickersFromTradingView: async function (req, res) {
    let driver;
    let {
      tradingViewScreenerUrl,
      tradingViewScreenerCriteria,
      tradingViewAjaxUrl,
      tradingViewScreenerSortBy,
      tradingViewColumns,
      tradingViewScreenerOptions,
      tradingViewScreenerRange,
      tradingViewScreenerSymbols,
      tradingViewScreenerSleep
    } = await SettingsService.getSettings();

    try {
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get(tradingViewScreenerUrl);
      // Some time out so trading view does not think I am stealing their data
      await driver.sleep(tradingViewScreenerSleep);

      let tickers = _.get(await driver.executeAsyncScript(loadTickersDataAsync, tradingViewAjaxUrl, {
        "filter": tradingViewScreenerCriteria,
        "symbols": tradingViewScreenerSymbols,
        "columns": tradingViewColumns,
        "sort": tradingViewScreenerSortBy,
        "options": tradingViewScreenerOptions,
        "range": tradingViewScreenerRange
      }), 'data');
      await TickerService.addNewsToTickers(transform(tickers, tradingViewColumns), true);
    } finally {
      if (driver) {
        // done with the requests close the browser
        await driver.quit();
      }
    }

    if (res) {
      res.json({
        success: true
      });
    }
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

function loadTickersDataAsync(url, queryParams) {
  var callback = arguments[arguments.length - 1];
  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(queryParams),
    success: function (data) {
      typeof callback === 'function' && callback(data);
    },
    failure: function () {
      typeof callback === 'function' && callback(null);
    }
  });
}
