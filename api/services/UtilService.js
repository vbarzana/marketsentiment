const moment = require('moment-timezone');
const _ = require('lodash');

// To every tweet that was found in a guru, multiply it by 100 to give it more weight
const GURU_WEIGHT = 100;
const NEWS_WEIGHT = 10;
const TWEETS_WEIGHT = 15;
const STOCKTWITS_SEARCH_WEIGHT = 10;
const STOCK_TRENDING_WEIGHT = 500;

/**
 * @class UtilService
 */
module.exports = {
  // find the guru name here
  GURUS: [{
    name: 'timothysykes',
    rank: 50
  }, {
    name: 'modern_rock',
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
    rank: 80
  }],

  userIsGuru: function (username) {
    !!this.findGuruByScreenName(username);
  },

  findGuruByScreenName: function (username) {
    if (!username) {
      return false;
    }
    let lowerCaseUsername = _.toLower(username);
    return _.first(_.filter(this.GURUS, (guru) => {
      return _.toLower(guru.name) === lowerCaseUsername;
    }));
  },

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
      let sentiment = await StockTwitsService.getBullishBearishSentiment(ticker);

      let tweets = await TwitterService.search(`$${ticker}`);

      let yesterdayEvening = moment.tz(new Date(), "America/New_York").set('hours', '20').set('minutes', '0').subtract(1, 'days');

      let twitterUsers = [];
      tweets = _.filter(tweets.statuses, (tweet) => {
        if (moment.tz(new Date(tweet.created_at), "America/New_York").isAfter(yesterdayEvening)) {
          twitterUsers.push(_.get(tweet, 'user.screen_name'));
          return true;
        }
      });

      let twitter = {
        tweets: tweets,
        users: twitterUsers
      };


      let foundInTrendingList = _.size(_.filter(_.get(trending, 'symbols'), function (item) {
        return _.get(item, 'symbol') === ticker;
      })) > 0;

      return {
        searches: _.size(_.get(searchResults, 'results')),
        watchlistCount: _.get(mentioned, 'symbol.watchlist_count') || 0,
        trending: foundInTrendingList,
        sentiment: _.first(_.get(sentiment, 'data')),
        twitter: twitter
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
       | Bullish   | ${_.get(details, 'sentiment.bullish')}%  |\n
       | Bearish   | ${_.get(details, 'sentiment.bearish')}%  |\n
       | Trending among the top 30?| ${details.trending ? 'Yes' : 'No'} |\n`);

    let twitterTable = this.generateMarkdownTable(
      `| Twitter API | Details |\n
       | ------------------------- | ----------------|\n
       | Tweets since yesterday 8 pm | ${_.size(details.twitter.tweets)} |\n
       | People talking about it | `) + `${_.join(details.twitter.users, ',')} |`;


    return `\`\`\`${markdownTable}\`\`\`\n\`\`\`${twitterTable}\`\`\``;
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
    return (_.get(ticker, 'sentiment.searches') || 0) + STOCKTWITS_SEARCH_WEIGHT
      + (_.get(ticker, 'sentiment.watchlistCount') || 0)
      + (_.get(ticker, 'sentiment.trending') ? STOCK_TRENDING_WEIGHT : 0)
      + _.size(_.get(ticker, 'news')) + NEWS_WEIGHT
      + _.size(_.get(ticker, 'sentiment.twitter.tweets')) + TWEETS_WEIGHT
      + _.size(_.get(ticker, 'sentiment.sentiment.bullish'))
      + this.getGuruIndex(_.get(ticker, 'sentiment.twitter.tweets'));
  },

  getGuruIndex: function (tweets) {
    let username;
    let index = 0;
    _.forEach(tweets, (tweet) => {
      username = _.get(tweet, 'user.screen_name');
      let guru = this.findGuruByScreenName(username);
      if (!username || _.isEmpty(guru)) return;
      index += (guru.rank || 1) * GURU_WEIGHT;
    });
    return index;
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

_.forEach(module.exports.GURUS, (guru) => {
  guru.highlightColor = Math.random(255).toString().substr(2, 2) * Math.random(255).toString().substr(2, 2) * Math.random(255).toString().substr(2, 2);
});
