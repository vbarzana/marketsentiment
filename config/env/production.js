/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  log: {
    level: 'debug'
  },

  models: {
    migrate: 'safe'
  },

  session: {
    adapter: 'connect-mongo',
    uri: process.env.MONGODB_URI
  },

  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      url: process.env.MONGODB_URI
    }
  },

  stocktwits: {
    clientId: process.env.STOCKTWITS_CLIENT_ID,
    apiUrl: process.env.STOCKTWITS_API_URL,
    accessToken: process.env.STOCKTWITS_ACCESS_TOKEN
  },

  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },

  port: process.env.PORT || 1337,

  cors: {
    allRoutes: true,
    origin: '*',
    credentials: false
  },

  discord: {
    clientId: process.env.DISCORD_CLIENT_ID,
    token: process.env.DISCORD_TOKEN,
    nasdaqNewsChannelId: process.env.DISCORD_NASDAQ_NEWS_CHANNEL_ID,
    twitterChannelId: process.env.DISCORD_TWITTER_CHANNEL_ID,
    premarketNewsChannelId: process.env.DISCORD_PREMARKET_NEWS_CHANNEL_ID,
    oauthUrl: process.env.DISCORD_OAUTH_URL
  }
};
