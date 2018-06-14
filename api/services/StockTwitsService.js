/**
 * @class StockTwitsService
 */
const _ = require('lodash');
var request = require('request')
  ,   cachedRequest = require('cached-request')(request)
  ,   cacheDirectory = "/tmp/cache";

cachedRequest.setCacheDirectory(cacheDirectory);

const TIME_TO_RESET_CACHE = 60000 * 10; // reset the cache only after 10 minutes, so we avoid having 400 calls per hour

module.exports = {
  search: async function (symbol) {
    return await this.query(`${sails.config.stocktwits.apiUrl}/search.json?access_token=${sails.config.stocktwits.accessToken}&q=${symbol}`);
  },

  getTrendingSymbols: async function () {
    return this.query(`${sails.config.stocktwits.apiUrl}/trending/symbols.json?access_token=${sails.config.stocktwits.accessToken}`);
  },

  getSymbolData: async function (symbol) {
    return this.query(`${sails.config.stocktwits.apiUrl}/streams/symbol/${symbol}.json?access_token=${sails.config.stocktwits.accessToken}`);
  },

  query: async function (url) {
    return new Promise(function (resolve) {
      cachedRequest({url: url, ttl: TIME_TO_RESET_CACHE},
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

