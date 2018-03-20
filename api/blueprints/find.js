/**
 * Module dependencies
 */
const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
const _ = require('lodash');

/**
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 *
 * Optional:
 * @param {Object} where       - the find criteria (passed directly to the ORM)
 * @param {Integer} limit      - the maximum number of records to send back (useful for pagination)
 * @param {Integer} skip       - the number of records to skip (useful for pagination)
 * @param {String} sort        - the order of returned records, e.g. `name ASC` or `age DESC`
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 */

module.exports = function findRecords(req, res) {

	// Look up the model
	let Model = actionUtil.parseModel(req);
	let where = actionUtil.parseCriteria(req);

	// If an `id` param was specified, use the findOne blueprint action
	// to grab the particular instance with its primary key === the value
	// of the `id` param.   (mainly here for compatibility for 0.9, where
	// there was no separate `findOne` action)
	if (actionUtil.parsePk(req)) {
		return require('./findone')(req, res);
	}

	if (!_.isEmpty(req.param('query'))) {
		var queryConfig = Model.queryConfig || {};
		where = _.merge(where, JSON.parse(JSON.stringify(queryConfig).replace(/{{query}}/g, req.param('query'))));
		_.unset(where, 'query');
	}

	if (_.has(Model, 'definition.isDeleted')) {
		if (!where.isDeleted) {
			where.isDeleted = [false, null];
		}

		if (false === where.isDeleted) {
			where.isDeleted = [false, null];
		}
	}

	if (_.has(where, 'filter')) {
		var filter = {};

		try {
			filter = JSON.parse(where.filter);
		} catch (e) {
		}

		var searchstring = _.get(_.find(filter, { property: 'query' }), 'value', false);

		_.pullAllBy(filter, {property: 'query'});

		if (searchstring) {
			var queryConfig = Model.queryConfig || {};
			where = _.merge(where, JSON.parse(JSON.stringify(queryConfig).replace(/{{query}}/g, searchstring)));
		}

		var extified = convertExtjsFilterToWaterline(filter);
		_.unset(where, 'filter');

		if (_.isArray(extified)) {
			_.each(extified, function (filter) {
				if (_.has(filter, 'isDeleted')) {
					if (false === filter.isDeleted) {
						where.isDeleted = [false, null];
					} else {
						where.isDeleted = filter.isDeleted;
					}
				} else {
					where = _.merge(where, filter);
				}
			});
		}

		if (_.isObject(extified) && !_.isArray(extified)) {
			where = _.merge(where, extified);
		}
	}

	_.unset(where, 'query');
	_.unset(where, 'populate');

	// query many-to-many associations
	var associations = [];

	_.each(where, function (value, key) {
		var association = _.find(Model.associations, {
			alias: key
		});

		if (!association) {
			return;
		}

		if ('collection' !== association.type) {
			return;
		}

		var collection = '';
		var associationWhere = {};
		var idColumn = Model.identity;

		if (Model.attributes[key].through) {
			collection = Model.attributes[key].through;
			associationWhere[association.collection] = where[key];
		} else {
			collection = Model.attributes[key].collection;
			associationWhere[value.property] = value.value;
		}

		if (association.via) {
			idColumn = association.via;
		}

		associations.push({
			name: key,
			collection: collection,
			where: associationWhere,
			idColumn: idColumn
		});
	});

	// well, we try to query over a many-to-many relation table
	var idMap = {};
	var ids = [];
	var idGetter = {};

	_.each(associations, function (config) {
		idGetter[config.name] = function (callback) {
			sails.models[config.collection].find(config.where).exec(function (err, records) {
				if (err) {
					return res.serverError(err);
				}

				if (!idMap[config.name]) {
					idMap[config.name] = [];
				}

				_.each(records, function (record) {
					idMap[config.name].push(record[config.idColumn]);
					_.unset(where, config.name);
				});

				callback(null);
			});
		};
	});

	if (req.user) {
		PermissionsService.hasPermission(req.user, Model.identity.toUpperCase() + '_RESTRICT_TO_OWNED').then(function (restricted) {
			if (restricted) {
				where.responsibleUser = req.user.id;
			}

			queryRecords(idMap);
		});
	} else {
		queryRecords(idMap);
	}

	function queryRecords(idMap) {
		async.parallel(idGetter, function (err, results) {
			if (err) {
				return res.serverError(err);
			}

			try {
				ids = _.intersection.apply(null, _.values(idMap));
			} catch (e) {}

			if (!_.isEmpty(ids)) {
				where.id = ids;
			}

			_.unset(where, 'query');

			getRecords(Model, where, req, res);
		});
	}
};

function getRecords(Model, where, req, res) {
	// Lookup for records that match the specified criteria
	var sort = req.param('sort') || req.options.sort;

	var sorting = '';

	try {
		sorting = _.reduce(sort ? JSON.parse(sort) : [], function (result, config) {
			result[config.property] = config.direction === 'ASC' ? 1 : 0;
			return result;
		}, {});
	} catch (e) {}

	var query = Model.find()
		.where(where)
		.limit(actionUtil.parseLimit(req))
		.skip(actionUtil.parseSkip(req))
		.sort(sorting)
	;

	query = actionUtil.populateRequest(query, req);

	query.exec(function found(err, matchingRecords) {
		if (err) return res.serverError(err);
    return countAndSend(Model, where, matchingRecords, res);
	});
}

function countAndSend(model, where, records, res) {
	model.count()
		.where(where)
		.exec(function count(error, count) {
			return res.ok({
				success: true,
				total: count,
				records: records
			});
		})
	;
}

function convertExtjsFilterToWaterline(filters) {
	var extifies = [];

	// and/or filter
	if (_.isObject(filters)) {
		if (_.has(filters, 'or')) {
			extifies = {
				or: []
			};

			_.each(convertExtjsFilterToWaterline(filters.or), function (or) {
				extifies.or.push(or);
			});
		}
	}

	// simple filtering
	if (_.isArray(filters)) {
		_.each(filters, function (filter) {
			var extify = {};

			if (filter.association) {
				extify[filter.association] = {
					property: filter.property,
					value: filter.value
				}
			} else if (_.has(filter, 'operator')) {
				extify[filter.property] = getComparisonForWaterline(filter);
			} else {
				extify[filter.property] = filter.value;
			}

			extifies.push(extify);
		});
	}

	return extifies;
}

function getComparisonForWaterline(filter) {
	var comparison = {};

	if (filter.operator !== 'equals' && filter.operator !== 'in') {
		comparison[filter.operator] = filter.value;
	} else {
		return filter.value;
	}

	return comparison;
}
