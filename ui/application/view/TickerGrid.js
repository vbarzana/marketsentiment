/**
 * @class Marketsentiment.view.TickerGrid
 */
Ext.define('Marketsentiment.view.TickerGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.tickergrid',
  requires: ['Marketsentiment.view.TickerGridViewModel'],
  viewModel: 'tickergrid-viewmodel',
  title: 'Let\'s hack it all!',
  bind: '{tickers}',

  plugins: {
    gridfilters: true
  },

  bbar: {
    xtype: 'pagingtoolbar',
    displayInfo: true
  },

  tbar: {
    items: ['->', {
      iconCls: 'fa fa-refresh',
      text: 'Sync database with the market'
    }]
  },

  viewConfig: {
    enableTextSelection: true
  },

  forceFit: true,
  columns: [{
    header: 'Symbol',
    dataIndex: 's',
    width: 100,
    filter: {
      type: 'string'
    }
  }]
});
