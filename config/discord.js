/**
 * @class config.discord
 *
 * (sails.config.discord)
 */
module.exports.discord = {
  clientId: process.env.DISCORD_CLIENT_ID,
  token: process.env.DISCORD_TOKEN,
  nasdaqNewsChannelId: process.env.DISCORD_NASDAQ_NEWS_CHANNEL_ID,
  otcNewsChannelId: process.env.DISCORD_OTC_NEWS_CHANNEL_ID,
  oauthUrl: process.env.DISCORD_OAUTH_URL
};
