/**
 * @class config.modules
 *
 * Default modules configuration
 * (sails.config.modules)
 */

var _ = require('lodash');
var fs = require('fs');

module.exports.modules = {

	/**
	 * Array of all available modules
	 * @cfg {Array} available
	 */
	available: fs.readdirSync('ui/modules/').map(_.upperFirst),

	/**
	 * Array of all module with generic permissions. For each controller in this array the following
	 * permissions are created if crud = true:
	 *
	 * <module name>_ACCESS
	 * <module name>_EDIT
	 * <module name>_DELETE
	 * <module name>_ADD
	 *
	 * @cfg {Array} controllers
	 */
	permissions: []
};
