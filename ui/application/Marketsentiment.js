(function () {
  Ext.Loader.setConfig({
    disableCaching: true,
    enabled: true
  });

  Ext.Loader.setPath('Marketsentiment.component', './ui/component/');
  Ext.Loader.setPath('Marketsentiment.store', './ui/store/');
  Ext.Loader.setPath('Marketsentiment.model', './ui/model/');
  Ext.Loader.setPath('Ext.ux', './node_modules/ext/packages/ux/classic/src/');
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
