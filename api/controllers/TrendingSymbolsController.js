/**
 * @class TrendingSymbolsController
 * @type {{loadGoogleData: module.exports.loadGoogleData}}
 */
const _ = require('lodash');
const request = require('request');

module.exports = {
  loadTrendingSymbolsFromStockTwits: async function (req, res) {
    request(`${sails.config.stocktwits.apiUrl}/trending/symbols.json?access_token=${sails.config.stocktwits.accessToken}`, async (err, request, body) => {
      let stockTwitsData = {};
      try {
        stockTwitsData = JSON.parse(body);
        let symbolsArray = _.get(stockTwitsData, 'symbols');
        // @todo: add stocktwits data to our db
      } catch (err) {
        // ignore
      }
      res.send({
        success: true,
        data: stockTwitsData,
        error: err
      });
    });
  }
};
