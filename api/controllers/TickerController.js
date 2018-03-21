/**
 * @class TickerController
 */
module.exports = {
  startAutomaticNewsUpdate: function (req, res) {
    var interval = req.param('interval');
    TickerService.startAutomaticNewsUpdate(interval);
  },

  stopAutomaticNewsUpdate: function () {
    TickerService.stopAutomaticNewsUpdate();
  }
};
