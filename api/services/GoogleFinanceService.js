const googleFinance = require('google-finance');
const _ = require('lodash');
const moment = require('moment');

const START_DATE = moment().subtract(5, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadCompanyNews: function (symbols, startDate, endDate) {
    return new Promise((resolve, reject) => {
      googleFinance.companyNews({
        symbols: symbols,
        from: startDate || START_DATE,
        to: endDate || END_DATE
      }, function (err, news) {
        if (err) return reject(err);
        resolve(news);
      });
    });
  }
};
