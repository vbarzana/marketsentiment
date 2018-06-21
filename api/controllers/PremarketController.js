/**
 * @class DailyReportController
 */

const _ = require('lodash');
const moment = require('moment');

module.exports = {

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
      setInterval(() => this.loadPremarketTickers(premarketSettings), updateTickersInterval); // update tickers every 3 minutes
    }
  },

  loadPremarketTickers: async function (settings) {
    if (!this.isPremarketTime()) return;
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

    let tickers = await TradingViewService.loadTickersCrossSiteScripting(_.get(settings, 'tradingViewAjaxUrl'), filters);
    tickers = await NewsService.addNewsToTickers(tickers);
    tickers.sort(function (a, b) {
      return _.get(a, 'd.pre_change') >= _.get(b, 'd.pre_change') ? -1 : 1;
    });

    var promises = [];
    _.forEach(tickers, (symbol) => {
      promises.push(this.getPremarketData(symbol.s, symbol.news, symbol.d));
    });
    let toNotify = await Promise.all(promises);
    toNotify.sort(UtilService.sortBySentimentPremarket);

    await DiscordService.clearPremarketChannel();

    _.forEach(toNotify, async function (item, idx) {
      var fires = idx <= 3 ? 5 : idx < 7 ? 3 : idx < 10 ? 2 : 0;
      var emoji = fires > 0 ? UtilService.getFires(fires) : '';
      if (_.isEmpty(item.news)) {
        item.body = item.body || '';
        item.body += '\n**No news found for this stock**'
      }
      await DiscordService.notifyPremarket(item.title + emoji, item.body, 65280, item.chart, null, item.news);
    });
  },

  getPremarketData: async function (symbol, news, details) {
    var yesterday = moment().utc().subtract(4, 'days');
    let newsArray = [];
    let {timezone} = await SettingsService.getPremarketSettings() || [];

    _.forEach(news, async (item) => {
      if (!item || NewsService.isCrappyNews(item.title)) return true;
      var newsDate = moment(item.date).utc();

      if (newsDate >= yesterday) {
        item.description = _.toString(item.description);
        item.title = _.toString(item.title);

        newsArray.push({
          name: item.title,
          value: `\`\`\`${item.description}\`\`\` Date: [${moment.tz(newsDate, timezone).format('L HH:mm a')}](${item.link})`
        });
      }
    });


    var symbolAndExchange = _.split(symbol || item.symbol, ':');
    var cleanSymbol = _.trim(_.last(symbolAndExchange));

    let body = '';
    let sentiment;
    try {
      sentiment = await UtilService.getMoreStockDetails(cleanSymbol);
      body += UtilService.stockDetailsToTable(sentiment);
    } catch (err) {
      console.log('Could not pull more details for ticker ' + cleanSymbol, err.message);
    }

    return {
      symbol: cleanSymbol,
      sentiment: sentiment,
      news: newsArray,
      d: details,
      title: `${cleanSymbol} | ${TickerService.getTickerDetailsAsString(details)} | UP Premarket: ${Math.round(_.get(details, 'pre_change'))}%`,
      body: body,
      chart: `https://www.stockscores.com/chart.asp?TickerSymbol=${cleanSymbol}&TimeRange=180&Interval=d&Volume=1&ChartType=CandleStick&Stockscores=1&ChartWidth=1100&ChartHeight=480&LogScale=&Band=&avgType1=&movAvg1=&avgType2=&movAvg2=&Indicator1=None&Indicator2=None&Indicator3=None&Indicator4=None&endDate=&CompareWith=&entryPrice=&stopLossPrice=&candles=redgreen`
    };
  },


  isPremarketTime: function () {
    let currentTime = moment.tz(new Date(), "America/New_York");
    let marketOpenTime = moment.tz(new Date(), "America/New_York").set('hours', '9').set('minutes', 30);
    return currentTime.isBefore(marketOpenTime);
  }
};
