const moment = require('moment-timezone');
const _ = require('lodash');
const request = require('request');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: sails.config.twitter.consumerKey,
  consumer_secret: sails.config.twitter.consumerSecret,
  access_token_key: sails.config.twitter.accessToken,
  access_token_secret: sails.config.twitter.accessTokenSecret
});

// You can also get the stream in a callback if you prefer.
client.stream('statuses/filter', {track: 'javascript'}, function (stream) {
  stream.on('data', onRealTimeDataFromTwitter);

  stream.on('error', function (error) {
    throw error;
  });
});

/**
 * @class TwitterService
 */
module.exports = {
  search: function (word) {
    return new Promise((resolve) => {
      client.get('/search/tweets.json', {q: word}, function (error, tweets, response) {
        resolve(tweets || {});
      });
    });
  }
};

function onRealTimeDataFromTwitter(event) {
  let text = _.toString(_.get(event, 'extended_tweet.full_text') || _.get(event, 'retweeted_status.extended_tweet.full_text') || _.get(event, 'text'));
  let name = _.get(event, 'user.name');
  let screenName = _.get(event, 'user.screen_name');

  let guru = UtilService.findGuruByScreenName(screenName);
  if (_.isEmpty(guru)) {
    return;
  }

  // first get the picture from twitter profile
  request.get(`https://twitter.com/${screenName}/profile_image`, function (error, response) {
    let authorName = name;
    if (_.toLower(screenName) !== _.toLower(name)) {
      authorName = `${name} (@${screenName})`;
    }
    // then send out the tweet so everyone is alerted
    DiscordService.notifyTwitter(null, text, guru.highlightColor, null, null, null, {
      author: {
        name: authorName,
        icon_url: _.get(response, 'request.href')
      }
    });
  });
}