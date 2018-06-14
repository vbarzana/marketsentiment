/**
 * @class StockTwitsService
 */
const _ = require('lodash');
var request = require('request')
  , cachedRequest = require('cached-request')(request)
  , cacheDirectory = "/tmp/cache";

cachedRequest.setCacheDirectory(cacheDirectory);

// reset the cache only after 20 minutes, so we avoid having 400 calls per hour
cachedRequest.setValue('ttl', 60000 * 20);

module.exports = {
  search: async function (symbol) {
    return await this.query(`${sails.config.stocktwits.apiUrl}/search.json?access_token=${sails.config.stocktwits.accessToken}&q=${symbol}`);
  },

  searchSymbols: async function (symbols) {
    return await this.query(`${sails.config.stocktwits.apiUrl}/search/symbols.json?access_token=${sails.config.stocktwits.accessToken}&q=${symbols}`);
  },

  addSentimentToTickers: async function (symbols) {
    let symbolsString = _.reduce(symbols, function (result, symbol) {
      return result.push(_.isString(symbol) ? symbol : (symbol.s || symbol.symbol));
    }, []).join(',');
    var search = await this.searchSymbols(symbolsString);
    _.forEach(search, function(result){
      let item = _.first(_.filter(symbols, {s: result.symbol}));
      _.set(item, _.get(item, 'sentiment') || {});
      item.sentiment.search = result;
    });

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
    return new Promise(function (resolve) {
      cachedRequest({url: url},
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

