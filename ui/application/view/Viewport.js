/**
 * @class Marketsentiment.view.Viewport
 */
Ext.define('Marketsentiment.view.Viewport', {
  extend: 'Ext.container.Viewport',
  xtype: 'marketsentiment-viewport',
  requires: ['Marketsentiment.view.TickerGrid'],

  title: 'Market Sentiment',
  layout: 'border',

  items: [
    {
      xtype: 'toolbar',
      cls: 'main-toolbar',
      height: 64,
      region: 'north',
      items: [
        {
          cls: 'main-logo',
          xtype: 'component',
          html: '<div class="main-logo"><i class="fa fa-line-chart"></i><span>Market Sentiment!</span></div>',
          width: 250
        }
      ]
    }, {
      xtype: 'tabpanel',
      region: 'center',
      items: [{
        xtype: 'tickergrid'
      }]
    }
  ]
});
