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

const QUERY_DATA = {
  "filter": FILTER,
  "symbols": {"query": {"types": []}},
  "columns": COLUMNS,
  "sort": SORT,
  "options": {"lang": "en"},
  "range": [0, 150]
};

module.exports = {
  pullTickersFromTradingView: async function (req, res) {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('https://www.tradingview.com/screener/');
      // Some time out so trading view does not think I am stealing their data
      await driver.sleep(3000);

      let data = await driver.executeAsyncScript(loadTickersDataAsync, URL, QUERY_DATA);

      data = _.get(data, 'data') || data;

      await this.addNewsToData(data);
      await this.saveTickers(data);

    } finally {
      // done with the requests close the browser
      await driver.quit();
    }

    res.json({
      success: true
    });
  },

  saveTickers: async function (data) {
    let promises = [];
    _.forEach(data, function (symbol) {
      promises.push(new Promise(async resolve => {
        let result;
        try {
          // convert the symbols to object data
          if (_.isArray(symbol.d)) {
            symbol.d = _.reduce(symbol.d, function (map, item, idx) {
              map[COLUMNS[idx]] = item;
              return map;
            }, {});
          }

          result = await Ticker.findOne({s: symbol.s});
          if (!result) {
            await Ticker.create(symbol);
          } else {
            await Ticker.update(result, symbol);
          }
        } catch (err) {
        }
        resolve(result);
      }));
    });
    return await Promise.all(promises);
  },

  addNewsToData: async function (data) {
    let symbols = _.reduce(data, function (array, item) {
      return _.concat(array, [item.s]);
    }, []);

    let news;
    try {
      // news = await GoogleFinanceService.loadCompanyNews(symbols);
      news = await YahooFinanceService.loadCompanyNews(symbols);
    } catch (err) {
      console.log(err);
    }
    _.forEach(data, function (symbol) {
      if (!_.isEmpty(news[symbol.s])) {
        symbol.news = news[symbol.s];
      }
    });
    return data;
  }
};


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
