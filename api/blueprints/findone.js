/**
 * Module dependencies
 */
const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
const _ = require('lodash');

/**
 * Find One Record
 *
 * get /:modelIdentity/:id
 *
 * An API call to find and return a single model instance from the data adapter
 * using the specified id.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to look up *
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findOneRecord (req, res) {
	let Model = actionUtil.parseModel(req);
	let pk = actionUtil.requirePk(req);

	let query = Model.findOne(pk);
	let criteria = actionUtil.parseCriteria(req);

	_.unset(criteria, 'populate');

	query = actionUtil.populateRequest(query, req);
	query.where( criteria );

	query.exec(function found(err, matchingRecord) {
		if (err) return res.serverError(err);
		if(!matchingRecord) return res.notFound('No record found with the specified `id`.');

		if (req._sails.hooks.pubsub && req.isSocket) {
			Model.subscribe(req, matchingRecord);
			actionUtil.subscribeDeep(req, matchingRecord);
		}

		res.ok({
			success: true,
			total: 1,
			records: [ matchingRecord ]
		});
	});

};