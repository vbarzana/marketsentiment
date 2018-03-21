/**
 * @class Marketsentiment.view.TickerGridViewController
 */
Ext.define('Marketsentiment.view.TickerGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.tickergrid-viewcontroller',

  init: function () {
    io.socket.on('refreshnews', this.refreshGrid.bind(this));
  },

  refreshGrid: function () {
    this.getView().getStore().reload();
  },

  startStopAutoRefresh: function (checkbox) {
    var checked = checkbox ? checkbox.getValue() : false;
    var interval = 60000 * 3; // 3 minutes
    io.socket.get('/ticker/' + (checked ? 'startAutomaticNewsUpdate' : 'stopAutomaticNewsUpdate') + '?interval=' + interval);
  },

  pullTickersFromTradingView: function () {
    this.getView().setLoading('Loading data from tradingview/screener, and Google Finance please wait...');
    io.socket.get('/tradingview/pullTickersFromTradingView', function (done) {
      this.getView().setLoading(false);
      this.refreshGrid();
    }.bind(this));
  }
});
