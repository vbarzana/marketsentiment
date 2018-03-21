Ext.define('Marketsentiment.model.Ticker', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 's',
    type: 'string',
    convert: function (val) {
      return _.toString(val).replace('NASDAQ:', '');
    }
  }, {
    name: 'close',
    type: 'string',
    mapping: 'd.close'
  }, {
    name: 'volume',
    type: 'integer',
    mapping: 'd.volume'
  }, {
    name: 'newsToday',
    type: 'string',
    convert: function (val, rec) {
      var news = rec.get('news');
      var result = '';
      if (news) {
        var yesterday = moment().subtract(0.5, 'days').parseZone();
        _.forEach(news, function (item) {
          if (!item) return true;

          var dateParsed = moment(item.date).parseZone();
          if (dateParsed >= yesterday) {
            result += '<span class="title">' + item.title + '</span><br>' + _.toString(item.description) + '<br><a target="_blank" href="' + item.link + '" style="color: gray;font-size: 11px;"><i class="fa fa-clock-o"></i> ' + dateParsed.fromNow() + '</a><br>';
          }
        });
      }
      _.forEach([
        'drug approval', 'blockchain', 'Purchase Agreement', 'Earnings Call', 'Agreement', 'profitable',
        'profit', 'fourth quarter', 'results', 'Phase 1', 'Phase 2', 'Phase 3', 'Annual', 'Conference'
      ], function (word) {
        result = result.replace(new RegExp(word, 'i'), '<span class="highlighted">' + word + '</span>');
      });
      _.forEach(['FDA', 'Contract'], function (word) {
        result = result.replace(new RegExp(word, 'i'), '<span class="highlighted-green">' + word + '</span>');
      });
      return result;
    }
  }],

  proxy: {
    type: 'blueprint',
    blueprint: 'ticker'
  }
});
