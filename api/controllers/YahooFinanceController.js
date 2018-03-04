/**
 * @class YahooFinanceController
 * @type {{loadYahooData: module.exports.loadYahooData}}
 */
module.exports = {
  loadYahooData: async function(req, res){
    var data = await YahooFinanceService.loadYahooData();
    res.send({
      success: true,
      data: data
    })
  }
};
