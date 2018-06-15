/**
 * @class StockTwitsService
 */
const _ = require('lodash');
const request = require('request');
const cachedRequest = require('cached-request')(request);
cachedRequest.setCacheDirectory("/tmp/cache");

// reset the cache only after 20 minutes, so we avoid having 400 calls per hour
cachedRequest.setValue('ttl', 60000 * 20);

const API_DISABLED = false;

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

  getBullishBearishSentiment: async function (symbol) {
    return this.query(`${sails.config.stocktwits.apiUrl}/symbols/${symbol}/sentiment.json`);
  },

  query: async function (url) {
    if (API_DISABLED) {
      console.log('StockTwits API disabled intentionally, to enable it go to StocktwitsService and enable it again');
      return null;
    }
    this.loadingUrl = this.loadingUrl || {};
    if (this.loadingUrl[url]) {
      return this.loadingUrl[url];
    }

    return this.loadingUrl[url] = new Promise((resolve) => {
      cachedRequest({url: url},
        async (err, request, body) => {
          let data = {};
          try {
            data = JSON.parse(body);
          } catch (err) {
            // ignore
          }
          resolve(data);
          delete this.loadingUrl[url];
        });
    });
  }
};

