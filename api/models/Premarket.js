/**
 * @class Premarket
 * This class keeps a watchlist of all premarkets of the year
 */
module.exports = {

  schema: false,

  attributes: {
    date: {
      type: 'date'
    },

    watchlist: {
      type: 'json'
    }
  }
};
