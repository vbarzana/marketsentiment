const _ = require('lodash');
const request = require('request');
const jsdom = require("jsdom");

module.exports = {
  getTickerData: async function (symbol) {
    symbol = _.toUpper(symbol);

    let urlPremarket = `http://app.quotemedia.com/quotetools/jsVarsQuotes.go?webmasterId=101264&symbol=${symbol}`;
    return new Promise(async (resolve, reject) => {
      request.get(urlPremarket, function (error, response, data) {
        if (error) return reject(null);
        resolve(parseData(data));
      });
    });
  }
};

function parseData(data) {
  let cleanData = _.toString(data)
    .replace('qmQuote = new Object()', '')
    .replace(/(?:\\[rnt]|[\r\n\t]+)+/g, '')
    .replace(new RegExp('&ndash;', 'g'), '')
    .replace(new RegExp('\'<div class="qmjsleft">(.+?)<div class="qmjsright">', 'g'), '')
    .replace(new RegExp('\'<div class="(.+?)">', 'g'), '')
    .replace(/(\\)+/g, '')
    .replace(new RegExp('<span class="(.+?)">', 'g'), '')
    .replace(new RegExp('</span>', 'g'), '')
    .replace(new RegExp('</div>\'', 'g'), '')
    .replace(new RegExp('qmQuote.', 'g'), '')
    .split(';');

  return _.reduce(cleanData, function (output, entry) {
    entry = _.trim(entry);
    if (entry) {
      let keyVal = _.toString(entry).trim().split('=');
      if (_.size(keyVal) > 1) {
        output[keyVal[0]] = _.trim(keyVal[1]);
      }
    }
    return output;
  }, {});
}
