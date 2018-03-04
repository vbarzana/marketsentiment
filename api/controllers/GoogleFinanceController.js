/**
 * @class GoogleFinanceController
 * @type {{loadGoogleData: module.exports.loadGoogleData}}
 */
const _ = require('lodash');

module.exports = {
  loadCompanyNews: async function (req, res) {
    var tickers = _.split(req.param('s'), ',');
    // @todo: parse from, to params
    var data, error;
    try{
      data = await GoogleFinanceService.loadCompanyNews(tickers);
    } catch(err){
      error = err;
    }
    res.send({
      success: true,
      data: JSON.stringify(data, null, 2),
      error: error
    })
  }
};
