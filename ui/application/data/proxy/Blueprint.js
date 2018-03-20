/**
 * @class Marketsentiment.data.proxy.Blueprint
 *
 * Default proxy to access the default SailsJS blueprints. For more information about the SailsJS blueprints follow this
 * link: http://sailsjs.com/documentation/reference/blueprint-api
 */
Ext.define('Marketsentiment.data.proxy.Blueprint', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.blueprint',

	startParam: 'skip',
	pageParam: false,
	noCache: false,

	/**
	 * @cfg {String} [url="/rest"] Default blueprint prefix.
	 */
	blueprintUrl: '/api',

	/**
	 * @cfg {String} blueprint Endpoint on the server.
	 */
	blueprint: '',

	reader: {
		type: 'json',
		rootProperty: 'records'
	},

	constructor: function() {
		this.callParent(arguments);
		this.url = this.blueprintUrl + '/' + this.blueprint;
	}
});
