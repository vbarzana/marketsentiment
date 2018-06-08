/**
 * @class NewsController
 */
const _ = require('lodash');
const moment = require('moment');

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadCompanyNews: async function (symbols, startDate, endDate) {
    startDate = startDate || START_DATE;
    endDate = endDate || END_DATE;

    let promises = [];

    _.forEach(symbols, function (symbol) {
      promises.push(
        new Promise(function (resolve) {
          // Try loading the news for this ticker with Yahoo finance, otherwise fallback to IextradingService
          YahooFinanceService.loadNewsForTicker(symbol, startDate, endDate)
            .then(resolve)
            .catch(function (err) {
              console.log('Yahoo Finance news pull failed: ', _.last(_.split(symbol, ':')), err.message);
              return IextradingService.loadNewsForTicker(symbol, startDate, endDate);
            })
            .then(resolve)
            .catch(function (err) {
              console.log('Could not load iextrading news for symbol: ', _.last(_.split(symbol, ':')), err.message);
              resolve(null);
            });
        })
      );
    });
    let data = await Promise.all(promises);

    let result = {};
    _.forEach(data, function (item) {
      if (!item) return true;// continue
      result[item.s] = item.news;
    });
    return result;
  }
};
