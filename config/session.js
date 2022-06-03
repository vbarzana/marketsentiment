/**
 * Session Configuration
 * (sails.config.session)
 *
 * Sails session integration leans heavily on the great work already done by
 * Express, but also unifies Socket.io with the Connect session store. It uses
 * Connect's cookie parser to normalize configuration differences between Express
 * and Socket.io and hooks into Sails' middleware interpreter to allow you to access
 * and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.session.html
 */

module.exports.session = {

  /**
   * @cfg secret
   *
   * Session secret is automatically generated when your new app is created
   * Replace at your own risk in production-- you will invalidate the cookies
   * of your users, forcing them to log in again.
   */
  secret: '0f6e5b16306e7bb5cb40c5b61239cdfa',

  /**
   * @cfg {Object} cookie
   * @cfg {Number} [cookie.maxAge="24 * 60 * 60 * 1000"]
   *
   * Set the session cookie expire time The maxAge is set by milliseconds,
   * the example below is for 24 hours
   */
  cookie: {
    maxAge: 24 * 365 * 60 * 60 * 1000
  },

  /**
   * @cfg adapter Adapter for storing sessions
   */
  adapter: 'connect-mongo',

  /**
   * @cfg host Mongodb hostname
   */
  host: 'localhost',

  /**
   * @cfg port Mongodb port
   */
  port: 27017,

  /**
   * @cfg db Mongodb database
   */
  db: 'market-sentiment',

  /**
   * @cfg collection Mongodb collection using to store sessions
   */
  collection: 'sessions',

  saveUninitialized: false,
  resave: false
};
