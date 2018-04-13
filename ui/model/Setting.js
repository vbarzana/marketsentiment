Ext.define('Marketsentiment.model.Settings', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 'close',
    type: 'string',
    mapping: 'd.close'
  }, {
    name: 'volume',
    type: 'integer',
    mapping: 'd.volume'
  }, {
    name: 'float',
    type: 'integer',
    mapping: 'd.float_shares_outstanding'
  }],

  proxy: {
    type: 'blueprint',
    blueprint: 'settings'
  }
});
