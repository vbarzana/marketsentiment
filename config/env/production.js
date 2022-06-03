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

  orm: {
    _hookTimeout: 50000
  },

  log: {
    level: 'debug'
  },

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  models: {
    migrate: 'safe'
  },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: process.env.PORT || 80,

  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      url: process.env.MONGODB_URI
    }
  }

};
