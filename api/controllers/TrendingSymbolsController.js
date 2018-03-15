/**
 * @class TrendingSymbolsController
 * @type {{loadGoogleData: module.exports.loadGoogleData}}
 */
const _ = require('lodash');
const request = require('request');

module.exports = {
  loadTrendingSymbolsFromStockTwits: async function (req, res) {
    request(`${sails.config.stocktwits.apiUrl}/trending/symbols.json?access_token=${sails.config.stocktwits.accessToken}`, async (err, request, body) => {
      let data = {};
      try {
        data = JSON.parse(body);
        let symbolsArray = _.get(data, 'symbols');
        let promises = [];
        // transform the symbols to add the news on them
        _.forEach(symbolsArray, async (s) => {
          promises.push(GoogleFinanceService.loadCompanyNews(['NASDAQ:' + s.symbol])
            .then(function (news) {
              s.news = _.castArray(_.get(news, 'NASDAQ:' + s.symbol));
            })
            .catch(function () {
              s.news = [];
            })
          );
          promises.push(GoogleFinanceService.loadSymbolsHistoricalData(['NASDAQ:' + s.symbol])
            .then(function (historical) {
              s.historical = _.castArray(_.get(historical, 'NASDAQ:' + s.symbol));
            })
            .catch(function () {
              s.historical = [];
            })
          );
        });
        await Promise.all(promises);
      } catch (err) {
        // ignore
      }
      res.send({
        success: true,
        data: data,
        error: err
      });
    });
  }
};
