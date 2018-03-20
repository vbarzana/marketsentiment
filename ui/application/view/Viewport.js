/**
 * @class Marketsentiment.view.Viewport
 */
Ext.define('Marketsentiment.view.Viewport', {
	extend: 'Ext.container.Viewport',
	xtype: 'marketsentiment-viewport',

	title: 'Market Sentiment',
	layout: 'border',

	items: [
		{
			xtype: 'toolbar',
			cls: 'tt-viewport-toolbar',
			region: 'north',
			border: 0
		}, {
			xtype: 'tabpanel',
			cls: 'tt-viewport-tabpanel',
			ariaRole: 'presentation',
			region: 'center',
			items: [{
			  xtype: 'panel',
        title: "Let's hack it all!"
      }]
		}
	]
});
