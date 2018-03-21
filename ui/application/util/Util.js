/**
 * @class Marketsentiment.util.Util
 */
Ext.define('Marketsentiment.util.Util', {
  alternateClassName: 'Marketsentiment.Util',
  statics: {
    formatNumber: function (num) {
      num = parseInt(num, 10);
      var isNegative = false, formattedNumber;
      if (num < 0) {
        isNegative = true
      }
      num = Math.abs(num);
      if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
      } else if (num >= 1000000) {
        formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      } else if (num >= 1000) {
        formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
      } else {
        formattedNumber = num;
      }
      if (isNegative) {
        formattedNumber = '-' + formattedNumber
      }
      return formattedNumber;
    }
  }
});
