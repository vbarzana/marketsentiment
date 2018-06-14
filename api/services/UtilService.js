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

  getTrendingSymbolsCache: async function () {
    setTimeout(() => {
      delete this.trendingSymbols;
    }, 60000 * 5); // after a few minutes remove it

    this.trendingSymbols = this.trendingSymbols || await StockTwitsService.getTrendingSymbols();
    return this.trendingSymbols;
  },

  getMoreStockDetails: async function (ticker) {
    let result = '';
    try {
      let searchResults = await StockTwitsService.search(ticker);
      let mentioned = await StockTwitsService.getSymbolData(ticker);
      let trending = await this.getTrendingSymbolsCache();
      let foundInTrendingList = _.size(_.filter(_.get(trending, 'symbols'), function (item) {
        return _.get(item, 'symbol') === ticker;
      })) > 0;

      let stocktwitsCount = _.size(_.get(searchResults, 'results'));
      let markdownTable = this.generateMarkdownTable(`
      | StockTwits API ${foundInTrendingList ? UtilService.getFires(5, '📢') : ''} | Details |\n
          | ------------------------- | ----------------|\n
          | Found in                   | ${stocktwitsCount} search results  |\n
          | Watchlists   | ${_.get(mentioned, 'symbol.watchlist_count') || 0} matches  |\n
          | Trending among the top 30?| ${foundInTrendingList ? 'Yes' : 'No'} |\n`);
      result += `\`\`\`${markdownTable}\`\`\``;
    } catch (err) {
      console.log(err);
    }
    return result;
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
