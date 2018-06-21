const _ = require('lodash');
const moment = require('moment');
const request = require('request');

module.exports = {
  getTickerInfo: async function (ticker) {
    // @todo: find the ticker details service in tradingview
  },

  loadTickersCrossSiteScripting: async function (url, queryParams) {
    return new Promise(function (resolve, reject) {
      request.post({
        url: url,
        form: JSON.stringify(queryParams)
      }, function (error, response, body) {
        if (error) {
          return reject(error);
        }
        let tickers;
        if (_.isString(body)) {
          try {
            tickers = _.get(JSON.parse(body || '{}'), 'data');
            tickers = transform(tickers, _.get(queryParams, 'columns'));
          } catch (err) {
            console.log('Could not parse tickers from trading view', body);
          }
        }
        resolve(tickers);
      });
    });
  }
};

function transform(tickers, columns) {
  columns = _.castArray(columns);
  _.forEach(tickers, function (symbolObj) {
    // convert the symbols to object data
    if (_.isArray(symbolObj.d)) {
      symbolObj.d = _.reduce(symbolObj.d, function (map, item, idx) {
        map[columns[idx]] = item;
        return map;
      }, {});
    }
  });
  return tickers;
}
