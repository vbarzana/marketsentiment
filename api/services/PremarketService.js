const moment = require('moment-timezone');
const _ = require('lodash');

/**
 * @class TickerService
 */
module.exports = {
  findTodaysWatchlist: async function () {
    return await Premarket.findOne({
      createdAt: {
        '>=': this.getPremarketOpenTime().toISOString(),
        '<=': this.getMarketOpenTime().toISOString()
      }
    });
  },

  saveTodaysWatchlist: async function (watchlistObj, tickers) {
    if (!watchlistObj) {
      return await Premarket.create({watchlist: tickers});
    } else {
      return await Premarket.update(watchlistObj.id, {watchlist: tickers});
    }
  },

  /**
   * Removes any ticker that hasn't had any activity during the last 5 days
   * @returns {Promise<any[]>}
   */
  cleanupTickers: async function () {
    let tickers = await loadTickersFromDb();
    let promises = [];
    _.forEach(tickers, function (ticker) {
      let fiveDaysAgo = moment().subtract(5, 'days');
      if (fiveDaysAgo > moment(_.get(ticker, 'updatedAt'))) {
        promises.push(ticker.remove());
      }
    });
    return await Promise.all(promises);
  },

  cleanupAndSaveTickersToDb: async function (tickers) {
    try {
      await this.cleanupTickers();
    } catch (err) {
    }
    await this.saveTickers(tickers);

    return tickers;
  },

  saveTickers: async function (tickers) {
    let promises = [];
    _.forEach(tickers, function (symbolObj) {
      promises.push(new Promise(async resolve => {
        let result;
        try {
          result = await Ticker.findOne({s: symbolObj.s});
          if (!result) {
            await Ticker.create(symbolObj);
          } else {
            result = _.merge(result, _.omit(symbolObj, ['id']));
            await result.save();
          }
        } catch (err) {
        }
        resolve(result);
      }));
    });
    return await Promise.all(promises);
  },

  getTickerDetailsAsString: function (details) {
    if (_.isEmpty(details)) {
      return '';
    }
    return `${details.close} Close | ${parseFloat(details.change, 10).toFixed(2)}% | ${UtilService.formatNumber(details.volume)} Vol | ${UtilService.formatNumber(details.float_shares_outstanding)} Float`;
  },

  isPremarketTime: function () {
    return true;
    let currentTime = moment.tz(new Date(), "America/New_York");
    let premarketOpenTime = this.getPremarketOpenTime();
    let marketOpenTime = this.getMarketOpenTime();
    return currentTime.isAfter(premarketOpenTime) && currentTime.isBefore(marketOpenTime);
  },

  getPremarketOpenTime: function () {
    return moment.tz(new Date(), "America/New_York").set('hours', '4').set('minutes', 0);
  },
  getMarketOpenTime: function () {
    return moment.tz(new Date(), "America/New_York").set('hours', '9').set('minutes', 30);
  }
};


async function loadTickersFromDb() {
  try {
    return await Ticker.find();
  } catch (err) {
    return [];
  }
}
