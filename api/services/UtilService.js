const moment = require('moment-timezone');
const _ = require('lodash');

/**
 * @class UtilService
 */
module.exports = {
  isCrappyNews: function (text) {
    text = _.toString(text);
    return text.indexOf('Midday Gainers') >= 0
      && text.indexOf('Premarket Gainers') >= 0
      && text.indexOf('Premarket Losers') >= 0
      && text.indexOf('Midday Losers') >= 0;
  },

  getFires: function (numberOfFires) {
    let emoji = '';
    for (let i = 0; i < numberOfFires; i++) {
      emoji += '🔥';
    }
    return emoji;
  }
};
