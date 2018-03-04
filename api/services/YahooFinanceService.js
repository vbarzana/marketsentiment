var yql = require('yql');
var _ = require('lodash');

module.exports = {
  loadYahooData: function () {
    return new Promise((resolve, reject) => {
      let stringQuery = 'SELECT * FROM weather.forecast WHERE (location = 94089)';
      console.log('Running yahoo query:  ' + stringQuery);
      var query = new yql(stringQuery);

      query.exec(function (err, data) {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(data);
      });
    });
  }
};
