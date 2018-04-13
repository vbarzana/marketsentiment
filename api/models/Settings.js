/**
 * @class Ticker
 */
module.exports = {

  schema: false,

  attributes: {
    screenerCriteria: {
      type: 'array'
    },

    autoSyncOnStartup: {
      type: 'boolean'
    },

    autoSyncInterval: {
      type: 'integer'
    }
  }
};
