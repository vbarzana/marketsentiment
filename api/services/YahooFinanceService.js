const _ = require('lodash');
const URL = 'http://finance.yahoo.com/rss/headline?s=';
const moment = require('moment');
const Parser = require('rss-parser');
let parser = new Parser();

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadCompanyNews: async function (symbols, startDate, endDate) {
    startDate = startDate || START_DATE;
    endDate = endDate || END_DATE;

    let promises = [];
    _.forEach(symbols, function (symbol) {
      promises.push(
        new Promise((resolve) => {
          parser.parseURL(URL + _.last(_.split(symbol, ':')))
            .then(function (data) {
              let items = _.reduce(_.get(data, 'items'), function (result, item) {
                let newsDate = moment(_.get(item, 'pubDate'));
                if (newsDate.isAfter(startDate) && newsDate.isBefore(endDate)) {
                  result.push({
                    guid: item.guid,
                    symbol: symbol,
                    title: item.title,
                    description: item.content,
                    summary: item.contentSnippet,
                    date: item.pubDate,
                    link: item.link
                  })
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
            })
            .catch(function (err) {
              console.log('Could not load URL: ', URL + _.last(_.split(symbol, ':')), err.message);
              resolve();
            });
        }));
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
