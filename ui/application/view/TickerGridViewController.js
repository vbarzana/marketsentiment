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
  },

  filterByExchange: function (container, button, pressed) {
    var filters = [];
    var nasdaqButton = this.lookupReference('nasdaqButton');
    var otcButton = this.lookupReference('otcButton');
    if (nasdaqButton.checked) {
      filters.push({
        property: 's',
        value: 'NASDAQ'
      });
    }
    if (otcButton.checked) {
      filters.push({
        property: 's',
        value: 'OTC'
      });
    }
    this.getView().getStore().clearFilter();
    this.getView().getStore().filter(filters);
  }
});
