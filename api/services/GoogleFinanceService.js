const googleFinance = require('google-finance');
const _ = require('lodash');
const moment = require('moment');

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadCompanyNews: function (symbols, startDate, endDate) {
    startDate = startDate || START_DATE;
    endDate = endDate || END_DATE;

    return new Promise((resolve, reject) => {
      googleFinance.companyNews({
        symbols: symbols
      }, function (err, news) {
        if (err) return reject(err);

        // parse the news to filter out the ones that don't match start/end date
        _.forEach(news, function (newsArray, symbol) {
          news[symbol] = _.filter(newsArray, function (newsItem) {
            let newsDate = moment(_.get(newsItem, 'date'));
            return newsDate.isAfter(startDate) && newsDate.isBefore(endDate);
          });
          news[symbol].sort(function(a, b){
           return moment(_.get(a, 'date')) > moment(_.get(b, 'date'))?-1:1;
          })
        });
        resolve(news);
      });
    });
  },

  loadSymbolsHistoricalData: function (symbols, startDate, endDate) {
    startDate = startDate || moment().subtract(1, 'days').toDate();
    endDate = endDate || END_DATE;

    return new Promise((resolve, reject) => {
      googleFinance.historical({
        symbols: symbols,
        from: startDate,
        to: endDate
      }, function (err, data) {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
};
