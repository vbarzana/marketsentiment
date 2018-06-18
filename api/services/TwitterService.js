const _ = require('lodash');
const moment = require('moment-timezone');
const request = require('request');
const Twitter = require('twitter');
const UtilService = require('./UtilService');

let client = new Twitter({
  consumer_key: sails.config.twitter.consumerKey,
  consumer_secret: sails.config.twitter.consumerSecret,
  access_token_key: sails.config.twitter.accessToken,
  access_token_secret: sails.config.twitter.accessTokenSecret
});

let gurusToFollow = _.reduce(UtilService.GURUS, (list, guru) => {
  let guruName = _.get(guru, 'name');
  if (!guruName) return list;
  return list += list ? (',' + guruName) : guruName;
}, '');

client.get('users/lookup', {screen_name: gurusToFollow}, function (error, users) {
  let idsToFollow = _.reduce(users, (list, user) => {
    let id = _.get(user, 'id');
    if (!id) return list;
    return list += list ? (',' + id) : id;
  }, '');

  // You can also get the stream in a callback if you prefer.
  client.stream('statuses/filter', {follow: idsToFollow}, function (stream) {
    console.log('Connected to Twitter API to listen for real-time tweets from the following follows: ' + gurusToFollow);
    stream.on('data', onRealTimeDataFromTwitter);

    stream.on('error', function (error) {
      throw error;
    });
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
  console.log('New tweet received from guru: ' + guru.name);

  // first get the picture from twitter profile
  request.get(`https://twitter.com/${screenName}/profile_image`, function (error, response) {
    let authorName = name;
    if (_.toLower(screenName) !== _.toLower(name)) {
      authorName = `${name} (@${screenName})`;
    }
    let date = moment.tz(new Date(_.get(event, 'created_at')), "America/New_York").format('LLL');
    text += `\nCreated at: ${date} (EDT)`;
    // then send out the tweet so everyone is alerted
    DiscordService.notifyTwitter(null, text, guru.highlightColor, null, null, null, {
      author: {
        name: authorName,
        icon_url: _.get(response, 'request.href')
      }
    });
  });
}
