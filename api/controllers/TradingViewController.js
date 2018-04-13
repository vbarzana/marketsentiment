/**
 * @class TradingViewController
 */
const _ = require('lodash');
const {Builder} = require('selenium-webdriver');

//@todo: move to a configuration in the db
const COLUMNS = ["name", "close", "volume", "change", "float_shares_outstanding", "exchange", "description", "name", "subtype", "pricescale", "minmov", "fractional", "minmove2"];
const URL = 'https://scanner.tradingview.com/america/scan';
const SORT = {"sortBy": "change", "sortOrder": "desc"};
const FILTER = [
  {
    "left": "change", "operation": "nempty"
  }, {
    "left": "exchange",
    "operation": "equal",
    "right": "NASDAQ"           // Only NASDAQ symbols
  }, {
    "left": "volume",
    "operation": "in_range",
    "right": [50000, 10000000]  // With this volume
  }, {
    "left": "average_volume_10d_calc",
    "operation": "egreater",
    "right": 200000             // With AVG volume in 10 days bigger than this
  }, {
    "left": "close",
    "operation": "in_range",
    "right": [0.25, 7]          // And a price in between what you see here
  }, {
    "left": "Volatility.D",
    "operation": "in_range",
    "right": [5, 1e+100]        // Volatile
  }, {
    "left": "float_shares_outstanding",
    "operation": "in_range",
    "right": [500000, 30000000] // Latest float less than 30 Millions and bigger than 500K
  }];

module.exports = {
  pullTickersFromTradingView: async function (req, res) {
    let driver;
    try {
      driver = await new Builder().forBrowser('chrome').build();
      try {
        driver.manage().window().minimize();
      } catch (err) {
        // ignore
      }
      await driver.get('https://www.tradingview.com/screener/');
      // Some time out so trading view does not think I am stealing their data
      await driver.sleep(3000);

      let tickers = _.get(await driver.executeAsyncScript(loadTickersDataAsync, URL, {
        "filter": FILTER,
        "symbols": {"query": {"types": []}},
        "columns": COLUMNS,
        "sort": SORT,
        "options": {"lang": "en"},
        "range": [0, 150]
      }), 'data');
      await TickerService.addNewsToTickers(transform(tickers), true);
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

function transform(tickers) {
  _.forEach(tickers, function (symbolObj) {
    // convert the symbols to object data
    if (_.isArray(symbolObj.d)) {
      symbolObj.d = _.reduce(symbolObj.d, function (map, item, idx) {
        map[COLUMNS[idx]] = item;
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
