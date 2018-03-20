/**
 * @class Marketsentiment.view.TickerGridViewController
 */
Ext.define('Marketsentiment.view.TickerGridViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.tickergrid-viewcontroller',

  pullTickersFromTradingView: function () {
    this.getView().setLoading('Loading data from tradingview/screener, and Google Finance please wait...');
    io.socket.get('/tradingview/pullTickersFromTradingView', function (done) {
      this.getView().setLoading(false);
      this.getView().getStore().reload();
    }.bind(this));
  }

});
