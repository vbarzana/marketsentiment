Ext.define('Marketsentiment.model.Ticker', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 's',
    type: 'string',
    convert: function (val) {
      return _.toString(val).replace('NASDAQ:', '');
    }
  }],

  proxy: {
    type: 'blueprint',
    blueprint: 'ticker'
  }
});
