var yql = require('yql');
var _ = require('lodash');

module.exports = {
  example: function () {
    var query = new yql('SELECT * FROM weather.forecast WHERE (location = 94089)');

    query.exec(function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      let channel = _.get(data, 'query.results.channel');
      console.log(channel);

      let location = _.get(channel, 'location');
      let condition = _.get(channel, 'item.condition');
      if (!location || !condition) {
        return;
      }
      console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
    });

  }
};
