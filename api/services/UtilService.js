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
    name: 'Steven1_994',
    rank: 50
  }, {
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
    name: 'ilikebbstocks',
    rank: 40
  }, {
    name: 'jane_yul',
    rank: 40
  }, {
    name: 'kroyrunner89',
    rank: 80
  }, {
    name: 'AT09_Trader',
    rank: 80
  }, {
    name: 'CitronResearch',
    rank: 80
  }],

  userIsGuru: function (username) {
    return !!this.findGuruByScreenName(username);
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

  getFires: function (numberOfFires, emojiType) {
    let emoji = '';
    for (let i = 0; i < numberOfFires; i++) {
      emoji += emojiType || '🔥';
    }
    return emoji;
  },

  getMoreStockDetails: async function (ticker) {
    try {
      let searchResults, mentioned, trending, sentiment, tweets;
      try {
        searchResults = await StockTwitsService.search(ticker);
      } catch (err) {
        console.error('Could not load stocktwits for ' + ticker, err.message);
      }
      try {
        mentioned = await StockTwitsService.getSymbolData(ticker);
      } catch (err) {
        console.error('Could not load StockTwits Mentions for ' + ticker, err.message);
      }
      try {
        trending = await StockTwitsService.getTrendingSymbols();
      } catch (err) {
        console.error('Could not load StockTwits Trending for ' + ticker, err.message);
      }
      try {
        sentiment = await StockTwitsService.getBullishBearishSentiment(ticker);
      } catch (err) {
        console.error('Could not load StockTwits sentiment for ' + ticker, err.message);
      }

      try {
        tweets = await TwitterService.search(`$${ticker}`);
      } catch (err) {
        console.error('Could not load Twitter search for ' + ticker, err.message);
      }

      let yesterdayEvening = UtilService.getAfterHoursCloseTime();

      let twitterUsers = [];
      tweets = _.filter(tweets, (tweet) => {
        let createdAt = _.get(tweet, 'created_at');
        if (createdAt && UtilService.getNewYorkTime(createdAt, 'eee MMM dd HH:mm:ss ZZZZ yyyy').isAfter(yesterdayEvening)) {
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

  getAfterHoursCloseTime: function () {
    return moment.tz(new Date(), "America/New_York").set('hours', '20').set('minutes', '0').subtract(1, 'days');
  },

  getNewYorkTime: function (date, format) {
    return moment.tz(moment(date, format), "America/New_York");
  },

  stockDetailsToTable: function (details) {
    let users = _.get(details, 'twitter.users');
    let gurus = _.reduce(users, (array, user) => {
      if (this.userIsGuru(user)) {
        array.push(user);
      }
      return array;
    }, []);

    let markdownTable = this.generateMarkdownTable(
      `| Social Media |\n
       | ------------------------- |\n
       | TWITTER |\n
       | ${_.size(details.twitter.tweets)} 💬  |\n
       | ${gurus.join('/n') || '-'} (gurus mentions)  |\n
       | ----------------- |\n
       | STOCKTWITS  |\n
       | ${details.searches} (mentions) |\n
       | ${details.watchlistCount} (watchlists) |\n
       | ${_.get(details, 'sentiment.bullish') || '-'}% (bullish)  |\n
       | ${_.get(details, 'sentiment.bearish') || '-'}% (bearish)  |\n
       | ${details.trending ? 'Yes' : 'No'} (top 30?)|\n
      `);

    return `\`\`\`${markdownTable}\`\`\`\n`;
  },

  sortBySentiment: function (ticker1, ticker2) {
    return this.calculateSentimentIndex(ticker1) > this.calculateSentimentIndex(ticker2) ? -1 : 1;
  },

  sortByVolumePremarket: function (ticker1, ticker2) {
    return this.calculateSentimentIndexPremarket(ticker1) > this.calculateSentimentIndexPremarket(ticker2) ? -1 : 1;
  },

  getVolumeFromString: function (volume) {
    if (!_.isString(volume)) {
      return volume;
    }
    let regExp = new RegExp('k', 'i');
    if (volume.match(regExp)) {
      return parseInt(volume.replace(regExp, ''), 10) * 1000;
    }
    return parseInt(volume, 10);
  },

  calculateSentimentIndexPremarket: function (ticker) {
    return this.getVolumeFromString(_.toString(_.get(ticker, 'premarketDetails.premarketVolume')));
  },

  calculateSentimentIndex: function (ticker) {
    return (_.get(ticker, 'sentiment.searches') || 0) + STOCKTWITS_SEARCH_WEIGHT
      + (_.get(ticker, 'sentiment.watchlistCount') || 0)
      + (_.get(ticker, 'sentiment.trending') ? STOCK_TRENDING_WEIGHT : 0)
      + _.size(_.get(ticker, 'news')) + NEWS_WEIGHT
      + _.size(_.get(ticker, 'sentiment.twitter.tweets')) + TWEETS_WEIGHT
      + _.get(ticker, 'sentiment.sentiment.bullish')
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
        let cellContent = _.trim(cell).replace(new RegExp('/n', 'g'), '\n');
        newTable += `|${cellContent}${this.getFires((_.get(cellSizes, position) || 150) - _.size(cellContent) - 2, cellContent.indexOf('-----') >= 0 ? '-' : ' ')}`;
      });
      newTable += '|\n';
    });
    return newTable;
  },

  formatNumber: function (num) {
    num = parseInt(num, 10);
    var isNegative = false, formattedNumber;
    if (num < 0) {
      isNegative = true
    }
    num = Math.abs(num);
    if (num >= 1000000000) {
      formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
      formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      formattedNumber = num;
    }
    if (isNegative) {
      formattedNumber = '-' + formattedNumber
    }
    return formattedNumber;
  }
};

_.forEach(module.exports.GURUS, (guru) => {
  guru.highlightColor = Math.random(255).toString().substr(2, 2) * Math.random(255).toString().substr(2, 2) * Math.random(255).toString().substr(2, 2);
});
