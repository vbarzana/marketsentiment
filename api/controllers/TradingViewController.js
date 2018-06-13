/**
 * @class TradingViewController
 */
const _ = require('lodash');
const request = require('request');
const moment = require('moment');

module.exports = {
  startAutoSync: async function () {
    this.autoSyncNasdaq();
    this.autoSyncOtc();
    this.autoSyncPremarket();
  },

  autoSyncNasdaq: async function () {
    let {
      autoSyncOnStartup,
      autoSyncInterval,
      updateTickersInterval
    } = await SettingsService.getSettings();

    if (autoSyncOnStartup) {
      await this.pullTickersFromTradingView();
      TickerService.startAutomaticNewsUpdate(autoSyncInterval); // 3 min

      setInterval(async () => {
        await this.pullTickersFromTradingView();
        this.startAutomaticNewsUpdate(autoSyncInterval); // 3 min
      }, updateTickersInterval); // update tickers every 1 hour
    }
  },

  autoSyncOtc: async function () {
    let otcSettings = await SettingsService.getOtcSettings();
    let {
      autoSyncOnStartup,
      autoSyncInterval,
      updateTickersInterval
    } = otcSettings;

    if (autoSyncOnStartup) {
      await this.doPullTickersFromTradingView(otcSettings);
      TickerService.startAutomaticNewsUpdate(autoSyncInterval); // 3 min

      setInterval(async () => {
        await this.doPullTickersFromTradingView(otcSettings);
        this.startAutomaticNewsUpdate(autoSyncInterval); // 3 min
      }, updateTickersInterval); // update tickers every 1 hour
    }
  },

  isPremarketTime: function () {
    let currentTime = moment.tz(new Date(), "America/New_York");
    let marketOpenTime = moment.tz(new Date(), "America/New_York").set('hours', '9').set('minutes', 30);
    return currentTime.isBefore(marketOpenTime);
  },

  autoSyncPremarket: async function () {
    if (!this.isPremarketTime()) {
      return;
    }
    let premarketSettings = await SettingsService.getPremarketSettings();
    let {
      autoSyncOnStartup,
      updateTickersInterval
    } = premarketSettings;

    if (autoSyncOnStartup) {
      // reload the settings in case that they change which is weird use case
      await SettingsService.getPremarketSettings();

      await this.loadPremarketTickers(premarketSettings);

      this.updatePremarketInterval = setInterval(async () => {
        if (!this.isPremarketTime()) {
          clearInterval(this.updatePremarketInterval);
          return;
        }
        await this.loadPremarketTickers(premarketSettings);
      }, updateTickersInterval); // update tickers every 1 hour
    }
  },

  pullTickersFromTradingView: async function (req, res) {
    this.doPullTickersFromTradingView();

    if (res) {
      res.json({
        success: true
      });
    }
  },

  doPullTickersFromTradingView: async function (settings) {
    settings = settings || await SettingsService.getSettings();
    if (!settings) {
      console.error('Settings not provided or it could not read the settings from the database.');
      return null;
    }
    let filters = {
      "filter": _.get(settings, 'tradingViewScreenerCriteria'),
      "symbols": _.get(settings, 'tradingViewScreenerSymbols'),
      "columns": _.get(settings, 'tradingViewColumns'),
      "sort": _.get(settings, 'tradingViewScreenerSortBy'),
      "options": _.get(settings, 'tradingViewScreenerOptions'),
      "range": _.get(settings, 'tradingViewScreenerRange')
    };
    let {tradingViewAjaxUrl} = settings;

    let tickers = await loadTickersCrossSiteScripting(tradingViewAjaxUrl, filters);
    tickers = await TickerService.addNewsToTickers(tickers);
    await TickerService.doNotifyNews(tickers);
    await TickerService.cleanupAndSaveTickersToDb(tickers);
    return tickers;
  },

  loadPremarketTickers: async function (settings) {
    settings = settings || await SettingsService.getPremarketSettings();
    if (!settings) {
      console.error('Settings not provided or it could not read the settings from the database.');
      return null;
    }
    let filters = {
      "filter": _.get(settings, 'tradingViewScreenerCriteria'),
      "symbols": _.get(settings, 'tradingViewScreenerSymbols'),
      "columns": _.get(settings, 'tradingViewColumns'),
      "sort": _.get(settings, 'tradingViewScreenerSortBy'),
      "options": _.get(settings, 'tradingViewScreenerOptions'),
      "range": _.get(settings, 'tradingViewScreenerRange')
    };

    let tickers = await loadTickersCrossSiteScripting(_.get(settings, 'tradingViewAjaxUrl'), filters);
    tickers = await TickerService.addNewsToTickers(tickers);
    tickers.sort(function (a, b) {
      return _.get(a, 'd.pre_change') >= _.get(b, 'd.pre_change') ? -1 : 1;
    });

    var promises = [];
    _.forEach(tickers, (symbol) => {
      promises.push(this.getPremarketData(symbol.s, symbol.news, symbol.d));
    });
    let toNotify = await Promise.all(promises);
    await DiscordService.clearPremarketChannel();

    _.forEach(toNotify, async function (item) {
      await DiscordService.notifyPremarket(item.title, item.body, 65280);
    });
  },

  getPremarketData: async function (symbol, news, details) {
    var yesterday = moment().utc().subtract(4, 'days');
    let newsArray = [];
    let {timezone} = await SettingsService.getPremarketSettings() || [];

    _.forEach(news, async (item) => {
      if (!item) return true;
      var newsDate = moment(item.date).utc();

      if (newsDate >= yesterday) {
        item.description = _.toString(item.description);
        item.title = _.toString(item.title);

        newsArray.push(`\`\`\`${item.title}\n${item.description}\nDate: ${moment.tz(newsDate, timezone).format('L HH:mm a')}\nSource: ${item.link}\`\`\``);
      }
    });


    var symbolAndExchange = _.split(symbol || item.symbol, ':');
    var cleanSymbol = _.trim(_.last(symbolAndExchange));

    let body = '';
    try {
      if (!_.isEmpty(newsArray)) {
        body += '**NEWS in the last 4 days:** \n' + newsArray.join('\n\n');
      }
    } catch (err) {
      console.log(err);
    }
    return {
      title: `${cleanSymbol} ${TickerService.getDetailsString(details)} - UP Premarket: **${Math.round(_.get(details, 'pre_change'))}% **`,
      body: body
    };
  },


  iextradingData: async function () {
    var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5";

    return new Promise(function (resolve, reject) {
      request.get({
        url: url,

      }, function (error, response, body) {
        if (error) {
          return reject(error);
        }

        resolve(body);
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

async function loadTickersCrossSiteScripting(url, queryParams) {
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
};
