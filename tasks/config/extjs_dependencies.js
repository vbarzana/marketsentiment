module.exports = function(grunt) {
  const _ = require('lodash');
	grunt.config.set('extjs_dependencies', {
		dist: {
			options: {
				tempDir: '.tmp',
				rootDir: 'ui',
				excludeClasses: [
					'Sch.*',
					'Ext.*'
				],
				src: [
          'application/',
          'component/',
          'model/',
          'store/',
          'modules/'
				],
				resolveFrom: ['Marketsentiment']
			}
		}
	});

	grunt.loadNpmTasks('grunt-extjs-dependencies');
};
