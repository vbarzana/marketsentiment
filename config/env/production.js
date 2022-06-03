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

  port: process.env.PORT || 1337,
  skipFixtures: false,
  liftTimeout: 12000,
  tmpPath: '/app/.tmp',

  orm: {
    _hookTimeout: 50000
  },

  models: {
    migrate: 'safe'
  },

  sockets: {
    _hookTimeout: 50000,
    adapter: 'memory',
    pingInterval: 25000,
    transports: ['websocket']
  },

  session: {
    adapter: 'connect-mongo',
    url: process.env.MONGODB_URI,
    collection: 'sessions'
  },

  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      url: process.env.MONGODB_URI
    }
  }
};
