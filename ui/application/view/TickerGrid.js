/**
 * @class Marketsentiment.view.TickerGrid
 */
Ext.define('Marketsentiment.view.TickerGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.tickergrid',
  requires: [
    'Marketsentiment.view.TickerGridViewModel',
    'Marketsentiment.view.TickerGridViewController'
  ],
  viewModel: 'tickergrid-viewmodel',
  controller: 'tickergrid-viewcontroller',
  title: 'Let\'s hack it all!',
  bind: '{tickers}',

  cls: 'ticker-grid',

  plugins: ['gridfilters'],

  bbar: {
    xtype: 'pagingtoolbar',
    displayInfo: true
  },

  tbar: {
    items: ['->', {
      xtype: 'checkbox',
      checked: false,
      fieldLabel: 'Auto sync news',
      handler: 'startStopAutoRefresh'
    }, {
      iconCls: 'fa fa-refresh',
      text: 'Sync database with the market',
      reference: 'refreshData',
      handler: 'pullTickersFromTradingView'
    }]
  },

  viewConfig: {
    enableTextSelection: true
  },

  forceFit: true,
  columns: [{
    header: 'Symbol',
    dataIndex: 's',
    width: 150,
    filter: {
      type: 'string'
    }
  }, {
    header: 'Close',
    dataIndex: 'close',
    width: 100,
    filter: {
      type: 'string'
    }
  }, {
    header: 'Volume',
    dataIndex: 'volume',
    width: 100,
    filter: {
      type: 'string'
    },
    renderer: function (val) {
      return Marketsentiment.Util.formatNumber(val);
    }
  }, {
    header: 'Float',
    dataIndex: 'float',
    width: 100,
    filter: {
      type: 'string'
    },
    renderer: function (val) {
      return Marketsentiment.Util.formatNumber(val);
    }
  }, {
    header: 'News Today',
    dataIndex: 'newsToday',
    flex: 1,
    filter: {
      type: 'string'
    }
  }, {
    header: 'Previous News',
    dataIndex: 'previousNews',
    flex: 1,
    filter: {
      type: 'string'
    }
  }],
  listeners: {
    select: 'onGridItemSelected'
  }
});
