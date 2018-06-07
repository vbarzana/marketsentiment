const _ = require('lodash');

module.exports = function(grunt) {
	var modules = require(process.cwd() + '/config/modules').modules.available;

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
					'store/'
				],
				resolveFrom: ['Marketsentiment']
			}
		}
	});

	grunt.loadNpmTasks('grunt-extjs-dependencies');
};
