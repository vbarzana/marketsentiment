/**
 * @class controllers.ViewController
 *
 * This controller handles the HTML rendering of every view. In our ExtJS application we should
 * normally not having so much views rendered by the server.
 */

const _ = require('lodash');

/**
 * Shows the index view with all needed variables.
 *
 * @param req
 * @param res
 * @param config
 */
exports.index = function (req, res, config) {
  let promises = [];

  let assigns = {
    locales: req.getCatalog(),
    resources: sails.config.resources,
    minify: sails.config.views.minify
  };

  return res.view('homepage', assigns);
};
