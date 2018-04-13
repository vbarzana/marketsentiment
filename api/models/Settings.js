/**
 * @class Ticker
 */
module.exports = {

  schema: false,

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true
    },

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
