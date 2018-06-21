/**
 * @class config.discord
 *
 * (sails.config.discord)
 */
module.exports.discord = {
  clientId: process.env.DISCORD_CLIENT_ID,
  token: process.env.DISCORD_TOKEN,
  nasdaqNewsChannelId: process.env.DISCORD_NASDAQ_NEWS_CHANNEL_ID,
  twitterChannelId: process.env.DISCORD_TWITTER_CHANNEL_ID,
  premarketNewsChannelId: process.env.DISCORD_PREMARKET_NEWS_CHANNEL_ID,
  oauthUrl: process.env.DISCORD_OAUTH_URL
};
