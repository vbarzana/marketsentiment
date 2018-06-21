/**
 * @class Settings
 */
module.exports = {

  schema: false,

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true
    },

    tradingViewScreenerCriteria: {
      type: 'array'
    },

    autoSyncOnStartup: {
      type: 'boolean'
    },

    updateTickersInterval: {
      type: 'integer'
    },
    tradingViewColumns: {
      type: 'array'
    },
    tradingViewScreenerUrl: {
      type: 'string'
    },
    tradingViewAjaxUrl: {
      type: 'string'
    },
    tradingViewScreenerSortBy: {
      type: 'json'
    },
    tradingViewScreenerSymbols: {
      type: 'json'
    },
    tradingViewScreenerOptions: {
      type: 'json'
    },
    tradingViewScreenerRange: {
      type: 'array'
    },
    tradingViewScreenerSleep: {
      type: 'integer'
    },
    magicWords: {
      type: 'array'
    },
    timezone: {
      type: 'string'
    }
  }
};
