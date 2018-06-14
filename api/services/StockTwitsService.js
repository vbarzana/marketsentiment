/**
 * @class StockTwitsService
 */
const _ = require('lodash');
const request = require('request');

module.exports = {
  search: async function (symbol) {
    return this.query(`${sails.config.stocktwits.apiUrl}/search.json?access_token=${sails.config.stocktwits.accessToken}&q=${symbol}`);
  },

  getTrendingSymbols: async function () {
    return this.query(`${sails.config.stocktwits.apiUrl}/trending/symbols.json?access_token=${sails.config.stocktwits.accessToken}`);
  },

  getSymbolData: async function(symbol){
    return this.query(`${sails.config.stocktwits.apiUrl}/streams/symbol/${symbol}.json?access_token=${sails.config.stocktwits.accessToken}`);
  },

  query: async function (url) {
    return new Promise(function (resolve) {
      request(url,
        async (err, request, body) => {
          let data = {};
          try {
            data = JSON.parse(body);
          } catch (err) {
            // ignore
          }
          resolve(data);
        });
    });
  }
};

