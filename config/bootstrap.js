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
const _ = require('lodash');
const glob = require('glob');

module.exports.bootstrap = function (cb) {
  sails.after('hook:orm:loaded', function () {
    console.log('initializing fixtures');
    initializeFixtures();
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

function initializeFixtures() {
  glob('api/fixtures/*.json', function (err, files) {
    files.map(function (filePath) {
      let fixtureItems = require('../' + filePath);
      let name = _.toLower(_.last(_.split(filePath, '/')).replace('.json', ''));
      sails.log.info('Updating fixtures for: ' + name);

      _.each(fixtureItems, async function (item) {
        let Model = sails.models[name];
        if (!Model) return;
        try {
          var record = await Model.findOne({id: item.id});

          if (!record) {
            await Model.create(item);
          } else {
            await Model.update({id: item.id}, item);
          }
        } catch (err) {
          sails.log.error(err);
        }
      });
    });
  });
}
