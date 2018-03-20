/**
 * @class Marketsentiment.view.TickerGridViewModel
 */
Ext.define('Marketsentiment.view.TickerGridViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.tickergrid-viewmodel',
  requires: ['Marketsentiment.model.Ticker'],

  stores: {
    tickers: {
      model: 'Marketsentiment.model.Ticker',
      autoLoad: true,
      pageSize: 100
    }
  }

});
