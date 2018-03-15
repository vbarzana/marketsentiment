/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
const request = require('request');
const _ = require('lodash');

module.exports.bootstrap = function (cb) {
  // @todo: have a view to open the prompt from stocktwits to get the secret code
  // request(sails.config.stocktwits.oauthUrl, function (error, response, body) {
  //   error && console.log(error);
  //   console.log(body);
  //   sails.renderView(body);
  // });
  if (!sails.config.stocktwits.accessToken) {
    request.post({
      url: sails.config.stocktwits.getTokenUrl,
      form: {
        client_id: sails.config.stocktwits.clientId,
        client_secret: sails.config.stocktwits.clientSecret,
        code: sails.config.stocktwits.secretCode,
        grant_type: 'authorization_code',
        redirect_uri: sails.config.stocktwits.redirectUrl
      }
    }, function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(body);
      sails.config.stocktwits.accessToken = _.get(body, 'access_token');
      console.log(sails.config.stocktwits.accessToken);
    });
  }

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
