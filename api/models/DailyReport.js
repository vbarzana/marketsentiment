/**
 * @class DailyReport
 * Tracks the performance of a stock per date
 */
module.exports = {

  schema: false,

  attributes: {
    date: {
      type: 'date'
    },

    s: {
      type: 'string',
      required: true,
      unique: true
    },

    d: {
      type: 'json'
    },

    news: {
      type: 'array'
    },

    sentiment: {
      type: 'json'
    }
  }
};
