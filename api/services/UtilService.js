const moment = require('moment-timezone');
const _ = require('lodash');

/**
 * @class UtilService
 */
module.exports = {
  isCrappyNews: function (text) {
    text = _.toString(text);
    return text.indexOf('Midday Gainers') >= 0
      || text.indexOf('Premarket Gainers') >= 0
      || text.indexOf('Premarket Losers') >= 0
      || text.indexOf('Midday Losers') >= 0;
  },

  getFires: function (numberOfFires, emojiType) {
    let emoji = '';
    for (let i = 0; i < numberOfFires; i++) {
      emoji += emojiType || '🔥';
    }
    return emoji;
  },

  getMoreStockDetails: async function (ticker) {
    try {
      let searchResults = await StockTwitsService.search(ticker);
      let mentioned = await StockTwitsService.getSymbolData(ticker);
      let trending = await StockTwitsService.getTrendingSymbols();
      let foundInTrendingList = _.size(_.filter(_.get(trending, 'symbols'), function (item) {
        return _.get(item, 'symbol') === ticker;
      })) > 0;

      return {
        searches: _.size(_.get(searchResults, 'results')),
        watchlistCount: _.get(mentioned, 'symbol.watchlist_count') || 0,
        trending: foundInTrendingList
      };
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  stockDetailsToTable: function (details) {
    let markdownTable = this.generateMarkdownTable(
      `| StockTwits API ${details.trending ? UtilService.getFires(5, '📢') : ''} | Details |\n
       | ------------------------- | ----------------|\n
       | Found in                   | ${details.searches} search results  |\n
       | Watchlists   | ${details.watchlistCount} matches  |\n
       | Trending among the top 30?| ${details.trending ? 'Yes' : 'No'} |\n`);

    return `\`\`\`${markdownTable}\`\`\``;
  },

  sortBySentiment: function (ticker1, ticker2) {
    return this.calculateSentimentIndex(ticker1) > this.calculateSentimentIndex(ticker2) ? -1 : 1;
  },

  sortBySentimentPremarket: function (ticker1, ticker2) {
    return this.calculateSentimentIndexPremarket(ticker1) > this.calculateSentimentIndexPremarket(ticker2) ? -1 : 1;
  },

  calculateSentimentIndexPremarket: function (ticker) {
    return this.calculateSentimentIndex(ticker) + ((_.get(ticker, 'd.pre_change') || 0) + 11);
  },

  calculateSentimentIndex: function (ticker) {
    return _.get(ticker, 'sentiment.searches') || 0
    + _.get(ticker, 'sentiment.watchlistCount') || 0
    + _.get(ticker, 'sentiment.trending') ? 10000 : 0
      + _.size(_.get(ticker, 'news')) + 10
      + this.getGuruIndex(_.get(ticker, 'sentiment.tweets'));
  },

  getGuruIndex: function (tweets) {
    // find the guru name here
    let gurus = [{
      name: 'timothysykes',
      rank: 50
    }, {
      name: 'InvestorsLive',
      rank: 100
    }, {
      name: 'DekmarTrades',
      rank: 40
    }, {
      name: 'jane_yul',
      rank: 40
    }, {
      name: 'kroyrunner89',
      rank: 40
    }];

    return 0;
  },

  generateMarkdownTable: function (tableContent) {
    let newTable = '';
    let cellSizes = [];
    let lines = _.reduce(tableContent.split('\n'), function (array, line) {
      if (line) {
        line = _.trim(line);
        let start = line.startsWith("|") ? 1 : 0;
        let end = line.endsWith('|') ? line.length - 2 : line.length - 1;

        line = line.substr(start, end);

        // Looking for the widest cells to automatically apply the same width to the rest
        _.forEach(_.split(line, '|'), function (cell, idx) {
          if (!cellSizes[idx] || cellSizes[idx] < _.size(cell)) {
            cellSizes[idx] = _.size(cell);
          }
        });
        array.push(line);
      }
      return array;
    }, []);

    _.forEach(lines, (line) => {
      _.forEach(_.split(line, '|'), (cell, position) => {
        let cellContent = _.trim(cell);
        newTable += `| ${cellContent}${this.getFires((_.get(cellSizes, position) || 150) - _.size(cellContent) - 2, cellContent.indexOf('-----') >= 0 ? '-' : ' ')}`;
      });
      newTable += ' |\n';
    });
    return newTable;
  }
};
