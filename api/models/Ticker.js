/**
 * @class Ticker
 */
module.exports = {

  schema: false,

  attributes: {
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
    }
  }
};
