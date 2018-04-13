Ext.define('Marketsentiment.view.TradingViewChart', {
  extend: 'Ext.container.Container',
  alias: 'widget.tradingviewchart',
  id: 'tradingview-chart',
  config: {
    symbol: null
  },

  html: '<div><div id="trading-view-widget-container">Please select an item from the list to show it\'s chart here</div></div>',
  listeners: {
    render: function () {
      var symbol = this.getSymbol();
      if (!symbol) {
        return;
      }
      this.createWidget();
    }
  },

  createWidget: function(){
    this.widget = new TradingView.widget({
        "width": '100%',
        "height": '100%',
        "symbol": this.getSymbol(),
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "Light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "hideideas": true,
        "container_id": "trading-view-widget-container"
      }
    );
  },

  setSymbol: function (s) {
    this.callParent(arguments);
    if(!this.widget && s){
      this.createWidget();
    } else {
      this.widget.options.symbol = s;
      this.widget.reload();
    }
  }
});
