(function () {
  Ext.Loader.setConfig({
    disableCaching: !Config.caching,
    enabled: true
  });

  Ext.Loader.setPath('Marketsentiment.component', Config.host + '/ui/component/');
  Ext.Loader.setPath('Marketsentiment.store', Config.host + '/ui/store/');
  Ext.Loader.setPath('Marketsentiment.model', Config.host + '/ui/model/');
  Ext.Loader.setPath('Ext.ux', Config.host + '/node_modules/ext/packages/ux/classic/src/');
}());

/**
 * @class Marketsentiment
 *
 * This is the main application file. Here we setup the Ext.application with the default
 * viewport.
 */

Ext.application({

  name: 'Marketsentiment',

  appFolder: 'ui/application',

  requires: [
    'Marketsentiment.data.proxy.Blueprint',
    'Marketsentiment.view.Viewport'
  ],

  /**
   * @ignore
   */
  views: [
    'Viewport'
  ],

  mainView: 'Viewport'
});
