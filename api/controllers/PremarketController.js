/**
 * @class DailyReportController
 */

const _ = require('lodash');
const moment = require('moment');

module.exports = {

  autoSyncPremarket: async function () {
    let premarketSettings;
    try {
      premarketSettings = await SettingsService.getPremarketSettings() || {};
    } catch (err) {
      console.error(err);
    }
    let {
      autoSyncOnStartup,
      updateTickersInterval
    } = premarketSettings;

    if (autoSyncOnStartup && premarketSettings) {
      await this.loadPremarketTickers(premarketSettings);
      setInterval(async () => {
        // reload the settings in case that they change which is weird use case
        premarketSettings = await SettingsService.getPremarketSettings();

        this.loadPremarketTickers(premarketSettings);
      }, updateTickersInterval); // update tickers every 3 minutes
    }
  },

  loadPremarketTickers: async function (settings) {
    if (!PremarketService.isPremarketTime()) return;
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
    let todaysWatchlist = await PremarketService.findTodaysWatchlist();

    let tickersFromTradingView = await TradingViewService.loadTickersCrossSiteScripting(_.get(settings, 'tradingViewAjaxUrl'), filters);
    let tickersFromDb = _.get(todaysWatchlist, 'watchlist');
    let tickers = [];
    // add to the tickers object all tickers that are in the database or in tradingview
    _.forEach(tickersFromDb, (dbTicker) => {
      let trvTicker = _.first(_.filter(tickersFromTradingView, { s: dbTicker.s }));
      if (!trvTicker) tickers.push(dbTicker);
      else tickers.push(_.merge(dbTicker, trvTicker));
    });

    // look for newly found tradingview tickers
    _.forEach(tickersFromTradingView, (trvTicker) => {
      let addedTicker = _.first(_.filter(tickers, { s: trvTicker.s }));
      if (!addedTicker) {
        tickers.push(trvTicker);
      }
    });

    // Now the premarket tickers should remain in the search for all day
    tickers = await NewsService.addNewsToTickers(tickers);
    tickers.sort(function (a, b) {
      return _.get(a, 'd.pre_change') >= _.get(b, 'd.pre_change') ? -1 : 1;
    });

    var promises = [];
    _.forEach(tickers, (symbol) => {
      promises.push(this.getPremarketData(symbol.s, symbol.news, symbol.d));
    });
    let toNotify = await Promise.all(promises);
    if (_.isEmpty(toNotify)) {
      return;
    }
    toNotify.sort(UtilService.sortByVolumePremarket);

    await PremarketService.saveTodaysWatchlist(todaysWatchlist, tickers);
    await DiscordService.clearPremarketChannel();

    var titles = _.reduce(toNotify, function (string, item, idx) {
      if (!item || idx > 10) {
        return string;
      }
      var details = item.d || {};

      return string += `| ${item.symbol} | ${parseFloat(details.close).toFixed(2)} | ${UtilService.formatNumber(details.volume)} | ${UtilService.formatNumber(details.float_shares_outstanding)} | ${Math.round(_.get(details, 'pre_change'))}% | ${_.get(item.premarketDetails, 'premarketVolume')} |\n`;
    }, '| Symbol | Close | Vol | Float | Chg-Pre | Vol-Pre |\n');

    await DiscordService.notifyPremarket('10 TOP MOVERS', '', 65280, null, null, [{
      name: '------------ Sorted by premarket volume (15 mins delayed) ------------',
      value: '```' + UtilService.generateMarkdownTable(`${titles}`) + '```'
    }]);

    let item;
    for (let i = 0; i < _.size(toNotify); i++) {
      item = toNotify[i];
      if (_.isEmpty(item.news)) {
        item.body = item.body || '';
        item.body += '\n**No news found for this stock**'
      }
      await DiscordService.notifyPremarket(item.title, item.body, 65280, item.chart, null, item.news);
    }
    // post the same table at the bottom again, so we can se it from top to bottom and from bottom to top
    await DiscordService.notifyPremarket('10 TOP MOVERS', '', 65280, null, null, [{
      name: '------------ Sorted by premarket volume (15 mins delayed) ------------',
      value: '```' + UtilService.generateMarkdownTable(`${titles}`) + '```'
    }]);
  },

  getPremarketData: async function (symbol, news, details) {
    var yesterday = moment().utc().subtract(4, 'days');
    let newsArray = [];
    let { timezone } = await SettingsService.getPremarketSettings() || [];

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
    let premarketDetails = await QuoteMediaService.getTickerData(cleanSymbol);
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
      premarketDetails: premarketDetails,
      d: details,
      title: `${cleanSymbol} | ${TickerService.getTickerDetailsAsString(details)} | Premarket: Chg: ${Math.round(_.get(details, 'pre_change'))}% - Vol: ${_.get(premarketDetails, 'premarketVolume')}`,
      body: body,
      chart: `https://www.stockscores.com/chart.asp?TickerSymbol=${cleanSymbol}&TimeRange=180&Interval=d&Volume=1&ChartType=CandleStick&Stockscores=1&ChartWidth=1100&ChartHeight=480&LogScale=&Band=&avgType1=&movAvg1=&avgType2=&movAvg2=&Indicator1=None&Indicator2=None&Indicator3=None&Indicator4=None&endDate=&CompareWith=&entryPrice=&stopLossPrice=&candles=redgreen`
    };
  }
};
