/**
 * @class Marketsentiment.view.Viewport
 */
Ext.define('Marketsentiment.view.Viewport', {
  extend: 'Ext.container.Viewport',
  xtype: 'marketsentiment-viewport',
  requires: [
    'Marketsentiment.view.TickerGrid',
    'Marketsentiment.view.TradingViewChart'
  ],

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
        layout: 'border',
        title: 'Screener',
        iconCls: 'fa fa-pagelines',
        items: [{
          split: true,
          collapsible: true,
          region: 'north',
          xtype: 'tradingviewchart',
          height: '30%'
        }, {
          region: 'center',
          xtype: 'tickergrid'
        }]
      }, {
        title: 'Settings',
        iconCls: 'fa fa-cogs',
        xtype: 'form',
        fieldDefaults: {
          padding: 5
        },
        // layout: 'hbox',
        items: [
          {
            xtype: 'fieldset',
            collapsible: true,
            title: 'Screener Config',
            items: [{
              xtype: 'multiselector',
              title: 'Exchange',

              fieldName: 'exchange',
              value: 'NASDAQ',

              viewConfig: {
                deferEmptyText: false,
                emptyText: 'Please select an exchange'
              },

              search: {
                field: 'exchange',

                store: {
                  data: [{
                    exchange: 'NASDAQ'
                  }, {
                    exchange: 'NYSE'
                  }, {
                    exchange: 'AMEX'
                  }],
                  sorters: 'exchange'
                }
              }
            },
              {
                xtype: 'fieldcontainer',
                fieldLabel: 'Volume',
                combineErrors: false,
                layout: 'hbox',
                defaults: {
                  hideLabel: true,
                  margin: '0 5 0 0',
                  width: 150
                },
                items: [{
                  name: 'volume_from',
                  xtype: 'numberfield',
                  minValue: 0,
                  value: 50000
                }, {
                  name: 'volume_to',
                  xtype: 'numberfield',
                  minValue: 0,
                  value: 10000000
                }]
              },
              {
                xtype: 'fieldcontainer',
                fieldLabel: 'Close price',
                combineErrors: false,
                layout: 'hbox',
                defaults: {
                  hideLabel: true,
                  margin: '0 5 0 0',
                  width: 150
                },
                items: [{
                  name: 'close_from',
                  xtype: 'numberfield',
                  minValue: 0,
                  value: 0.25
                }, {
                  name: 'close_to',
                  xtype: 'numberfield',
                  minValue: 0,
                  value: 20
                }]
              },
              {
                xtype: 'fieldcontainer',
                fieldLabel: 'Float',
                combineErrors: false,
                name: 'float_shares_outstanding',
                layout: 'hbox',
                defaults: {
                  hideLabel: true,
                  margin: '0 5 0 0',
                  width: 150
                },
                items: [{
                  name: 'close_from',
                  xtype: 'numberfield',
                  minValue: 0,
                  value: 500000
                }, {
                  name: 'close_to',
                  xtype: 'numberfield',
                  minValue: 0,
                  value: 30000000
                }]
              }]
          },
          {
            xtype: 'fieldset',
            title: 'News search criteria',
            collapsible: true,
            items: [
              {
                xtype: 'fieldcontainer',
                fieldLabel: 'Autorefresh news in minutes',
                layout: 'hbox',
                defaults: {
                  hideLabel: true,
                  margin: '0 5 0 0',
                  width: 150
                },
                items: [{
                  xtype: 'checkbox',
                  checked: true,
                  fieldLabel: 'Auto refresh news',
                  reference: 'autoRefresh'
                }, {
                  name: 'refresh_interval',
                  xtype: 'numberfield',
                  placeHolder: 'Interval in minutes',
                  reference: 'minutes',
                  minValue: 0,
                  value: 3
                }]
              },
              {
                xtype: 'tagfield',
                createNewOnEnter: true,
                createNewOnBlur: true,
                fieldLabel: 'Find news containing',
                value: ["new product","new investor","funding","contract","fda","nda","drug approval","blockchain","Purchase Agreement","Earnings Call","fourth quarter","Phase 2","Phase 3","letter to shareholders","raised to buy","beats on earnings","8K","to report earnings","delisted","topline results","better than expected","downgraded","bankrupcy","buyout","patent","merger","split","gold award"],
                displayField: 'text',
                valueField: 'text',
                store: {
                  fields: ['text'],
                  data: [{ "text": "new product" }, { "text": "new investor" }, { "text": "funding" }, { "text": "contract" }, { "text": "fda" }, { "text": "nda" }, { "text": "drug approval" }, { "text": "blockchain" }, { "text": "Purchase Agreement" }, { "text": "Earnings Call" }, { "text": "fourth quarter" }, { "text": "Phase 2" }, { "text": "Phase 3" }, { "text": "letter to shareholders" }, { "text": "raised to buy" }, { "text": "beats on earnings" }, { "text": "8K" }, { "text": "to report earnings" }, { "text": "delisted" }, { "text": "topline results" }, { "text": "better than expected" }, { "text": "downgraded" }, { "text": "bankrupcy" }, { "text": "buyout" }, { "text": "patent" }, { "text": "merger" }, { "text": "split" }, { "text": "gold award" }]
                },
                forceSelection: false,
                queryMode: 'local',
                publishes: 'value'
              }
            ]
          }
        ],
        buttons: [{
          text: 'Save'
        }, {
          text: 'Reset'
        }]
      }]
    }
  ]
});
