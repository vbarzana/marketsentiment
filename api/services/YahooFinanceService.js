const _ = require('lodash');
const URL = 'http://finance.yahoo.com/rss/headline?s=';
const moment = require('moment');
const Parser = require('rss-parser');
let parser = new Parser();

module.exports = {
  loadNewsForTicker: async function (symbol, startDate, endDate) {
    var data = await parser.parseURL(URL + _.last(_.split(symbol, ':')));
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
  }
};
