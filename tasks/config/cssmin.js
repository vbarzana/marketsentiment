/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minify the intermediate concatenated CSS stylesheet which was
 * prepared by the `concat` task at `.tmp/public/concat/production.css`.
 *
 * Together with the `concat` task, this is the final step that minifies
 * all CSS files from `assets/styles/` (and potentially your LESS importer
 * file from `assets/styles/importer.less`)
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-cssmin
 *
 */
module.exports = function(grunt) {

  grunt.config.set('cssmin', {
    options: {
      relativeTo: './assets/styles',
      target: './tmp/public',
      rebase: true
    },
    target: {
      files: {
        '.tmp/public/marketsentiment.min.css': require('../../config/resources').resources.css
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
