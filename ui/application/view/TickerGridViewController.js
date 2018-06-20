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
    var values = [];
    var nasdaqButton = this.lookupReference('nasdaqButton');
    var otcButton = this.lookupReference('otcButton');

    if (nasdaqButton.pressed) {
      values.push('NASDAQ');
    }
    if (otcButton.pressed) {
      values.push('OTC');
    }
    this.getView().getStore().clearFilter();
    if (_.isEmpty(values)) {
      return;
    }
    this.getView().getStore().filterBy(function (rec) {
      var s = _.toString(rec.get('s'));
      var found = false;
      _.forEach(values, function (value) {
        if (s.indexOf(value) >= 0) {
          found = true;
        }
      });
      return found;
    });
  }
});
