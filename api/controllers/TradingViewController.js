/**
 * @class TradingViewController
 */
const _ = require('lodash');
const {Builder, By, Key, until} = require('selenium-webdriver');

module.exports = {
  pullTickersFromTradingView: async function () {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('https://www.tradingview.com/screener/');
      await driver.sleep(3000);

      let data = await driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        $.ajax({
          type: 'POST',
          url: 'https://scanner.tradingview.com/america/scan',
          data: JSON.stringify({
            "filter": [{"left": "change", "operation": "nempty"}, {
              "left": "exchange",
              "operation": "equal",
              "right": "NASDAQ"
            }, {
              "left": "volume",
              "operation": "in_range",
              "right": [50000, 10000000]
            }, {"left": "average_volume_10d_calc", "operation": "egreater", "right": 200000}, {
              "left": "close",
              "operation": "in_range",
              "right": [0.85, 7]
            }, {
              "left": "Volatility.D",
              "operation": "in_range",
              "right": [5, 1e+100]
            }, {"left": "float_shares_outstanding", "operation": "in_range", "right": [500000, 30000000]}],
            "symbols": {"query": {"types": []}},
            "columns": ["name", "close", "volume", "change", "float_shares_outstanding", "exchange", "description", "name", "subtype", "pricescale", "minmov", "fractional", "minmove2"],
            "sort": {"sortBy": "change", "sortOrder": "desc"},
            "options": {"lang": "en"},
            "range": [0, 150]
          }),
          success: function (data) {
            callback(data);
          }
        });

      }, function (data) { // Callback
        return data;
      });


      data = _.get(data, 'data') || data;

      await this.addNewsToData(data);
      await this.saveTickers(data);

    } finally {
      await driver.quit();
    }
  },

  saveTickers: async function (data) {
    let promises = [];
    _.forEach(data, function (symbol) {
      promises.push(new Promise(async resolve => {
        let result;
        try {
          result = await Ticker.findOne({s: symbol.s});
          if(!result){
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
      news = await GoogleFinanceService.loadCompanyNews(symbols);
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
