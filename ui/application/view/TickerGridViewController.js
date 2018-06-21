/**
 * @class Marketsentiment.view.TickerGridViewController
 */
Ext.define('Marketsentiment.view.TickerGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.tickergrid-viewcontroller',

  onGridItemSelected: function (selModel, record) {
    var chart = Ext.getCmp('tradingview-chart');
    if (chart) {
      chart.setSymbol(record.get('s'));
    }
  },

  init: function () {
    io.socket.on('refreshnews', this.refreshGrid.bind(this));
  },

  refreshGrid: function () {
    this.getView().getStore().reload();
  },

  deleteRecords: function () {
    _.forEach(this.getView().getSelection(), function (ticker) {
      ticker.erase();
    });
  },

  pullTickersFromTradingView: function () {
    this.getView().setLoading('Loading data from tradingview/screener, and Google Finance please wait...');
    io.socket.get('/tradingview/pullTickersFromTradingView', function (done) {
      this.getView().setLoading(false);
      this.refreshGrid();
    }.bind(this));
  }
});
