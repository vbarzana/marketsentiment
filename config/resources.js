/**
 * @class config.resources
 *
 * Resources
 * (sails.config.resources)
 *
 * Resources used by the application. The Resources used directly in the view
 * if minify is false.
 *
 * The Resources are also used in the build process for minification.
 */

module.exports.resources = {

	/**
	 * @cfg js
	 *
	 * All js files needed by the application in the correct order.
	 */
	js: [
		'node_modules/lodash/lodash.js',
		'node_modules/jszip/dist/jszip.js',
		'node_modules/ext/build/ext-all-debug.js',
		'assets/js/sails.io.js'
	],

	/**
	 * @cfg css
	 *
	 * All css files needed by the application in the correct order.
	 */
	css: [
		'node_modules/ext/build/classic/theme-triton/resources/theme-triton-all.css',
		'node_modules/ext/build/packages/ux/classic/classic/resources/ux-all.css',
		'node_modules/fatcow/icons-16px.css',
		'node_modules/fatcow/icons-32px.css',
		'node_modules/fatcow/flags-16px.css',
		'assets/styles/app.css'
	]
};
