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
        var yesterday = moment().subtract(1, 'days').parseZone();
        _.forEach(news, function (item) {
          if (!item) return true;

          var dateParsed = moment(item.date).parseZone();
          var words = ['FDA', 'Contract', 'drug approval', 'blockchain', 'Purchase Agreement', 'Earnings Call', 'Agreement', 'profitable', 'profit', 'fourth quarter', 'results'];
          var description = _.toString(item.description);
          _.forEach(words, function (word) {
            description = description.replace(new RegExp(word, 'i'), '<span class="highlighted">' + word + '</span>');
          });
          if (dateParsed >= yesterday) {
            result += description + '<br><i class="fa fa-clock-o"></i> ' + dateParsed.fromNow() + ' -  <a target="_blank" href="' + item.link + '">' + item.link + '</a>' + '<br>';
          }
        });
      }
      return result;
    }
  }],

  proxy: {
    type: 'blueprint',
    blueprint: 'ticker'
  }
});
