const _ = require('lodash');
const IEXTRADING_API_URL = 'https://api.iextrading.com/1.0/';
const STOCK_URL = IEXTRADING_API_URL + 'stock/';
const NEWS_HASH = '/news/last/20'; // {symbol}/news/last/20
const moment = require('moment');
const request = require('request');

const START_DATE = moment().subtract(3, 'days').toDate();
const END_DATE = moment().toDate();

module.exports = {
  loadNewsForTicker: async function (symbol, startDate, endDate) {
    let news = await this.query(STOCK_URL + _.last(_.split(symbol, ':')) + NEWS_HASH);
    let items = _.reduce(news, function (result, item) {
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

    return {
      s: symbol,
      news: items
    };
  },

  /**
   * @param tickers
   * @returns {Promise<void>}
   * @example response:
   *  {
   *     "SNAP":[{
   *        "price":13.425,"size":100,"tradeId":564868777,"isISO":false,"isOddLot":false,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833597117},
   *        {"price":13.425,"size":10,"tradeId":564790407,"isISO":false,"isOddLot":true,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833596957},
   *        {"price":13.425,"size":50,"tradeId":564726905,"isISO":false,"isOddLot":true,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833596635},
   *        {"price":13.425,"size":6,"tradeId":563800440,"isISO":false,"isOddLot":true,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833592258},
   *        {"price":13.425,"size":100,"tradeId":563800013,"isISO":false,"isOddLot":false,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833592256},
   *        {"price":13.435,"size":100,"tradeId":563545753,"isISO":false,"isOddLot":false,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833590551},
   *        {"price":13.435,"size":100,"tradeId":563545393,"isISO":false,"isOddLot":false,"isOutsideRegularHours":false,"isSinglePriceCross":false,"isTradeThroughExempt":false,"timestamp":1528833590549},
   *        ...
   *        ]
   *   }
   */
  getTickerTrades: async function (tickers) {
    return this.query(IEXTRADING_API_URL + 'deep/trades?symbols=' + (_.isArray(tickers) ? tickers.join(',') : tickers));
  },

  getLargestTrades: async function (tickers) {
    return this.query(IEXTRADING_API_URL + 'stock/' + (_.isArray(tickers) ? tickers.join(',') : tickers)) + '/largest-trades';
  },

  query: async function (url) {
    return new Promise(function (resolve, reject) {
      request.get(url, function (err, response, body) {
        if (err) return reject(err);
        try {
          body = _.trim(body);
          if (!body.startsWith('[') && !body.startsWith('{')) {
            body = [];
          } else {
            body = JSON.parse(body);
          }
        } catch (err) {
          reject(err);
        }
        return resolve(body);
      });
    });
  }
};


