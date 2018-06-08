const _ = require('lodash');
const STOCK_URL = 'https://api.iextrading.com/1.0/stock/';
const NEWS_HASH = '/news/last/20'; // {symbol}/news/last/20
const moment = require('moment');
const request = require('request');

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadNewsForTicker: async function (symbol, startDate, endDate) {
    let url = STOCK_URL + _.last(_.split(symbol, ':')) + NEWS_HASH;
    return new Promise(function (resolve, reject) {
      request.get(url, function (err, response, body) {
        if (err) return reject(err);
        if (!body.startsWith('[')) {
          body = [];
        } else {
          body = JSON.parse(body);
        }
        let items = _.reduce(body, function (result, item) {
          let newsDate = moment(_.get(item, 'datetime'));
          if (newsDate.isAfter(startDate) && newsDate.isBefore(endDate)) {
            result.push({
              symbol: symbol,
              title: item.headline,
              description: item.summary,
              summary: item.summary,
              date: item.datetime,
              link: item.url,
              source: item.source
            });
          }
          return result;
        }, []);

        items.sort(function (a, b) {
          return moment(_.get(a, 'date')) > moment(_.get(b, 'date')) ? -1 : 1;
        });

        resolve({
          s: symbol,
          news: items
        });
      });
    });
  }
};


