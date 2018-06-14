/**
 * @class NewsController
 */
const _ = require('lodash');
const moment = require('moment');

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadCompanyNews: loadCompanyNews
};

async function loadCompanyNews(symbols, startDate, endDate) {
  startDate = startDate || START_DATE;
  endDate = endDate || END_DATE;

  let promises = [];
  let yahooFailedTickers = {};

  _.forEach(symbols, function (symbol) {
    promises.push(
      new Promise(function (resolve) {
        // Try loading the news for this ticker with Yahoo finance, otherwise fallback to IextradingService
        YahooFinanceService.loadNewsForTicker(symbol, startDate, endDate)
          .then(resolve)
          .catch(function (err) {
            var msg = _.trim(err.message).substr(0, 100);

            yahooFailedTickers[msg] = yahooFailedTickers[msg] || [];
            yahooFailedTickers[msg].push(symbol);
            return IextradingService.loadNewsForTicker(symbol, startDate, endDate);
          })
          .then(resolve)
          .catch(function (err) {
            console.log('Could not load iextrading news for symbol: ', symbol, err.message);
            resolve(null);
          });
      })
    );
  });
  let response = await Promise.all(promises);
  if (!_.isEmpty(yahooFailedTickers)) {
    var msg = _.reduce(yahooFailedTickers, function (coll, val, key) {
      return coll += key + ': ' + val.join(',');
    }, '');
    console.log('Yahoo Finance news pull failed: ' + msg);
  }
  return transformDataNewsOutput(response);
}

function transformDataNewsOutput(data) {
  let result = {};
  _.forEach(data, function (item) {
    if (!item) return true;// continue
    result[item.s] = item.news;
  });
  return result;
}
