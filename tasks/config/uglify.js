/**
 * `uglify`
 *
 * ---------------------------------------------------------------
 *
 * Minify client-side JavaScript files using UglifyJS.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

  grunt.config.set('uglify', {
    options: {
      sequences: false,
      if_return: false
    },
    dist: {
      files: {
        '.tmp/public/marketsentiment.min.js': require('../../config/resources').resources.js
          .concat('<%= extjs_dependencies_dist %>')
          .concat('!assets/js/sails.io.js')
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
