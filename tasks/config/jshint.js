module.exports = function(grunt) {

	grunt.config.set('jshint', {
		all: {
			jshintrc: true,
			src: [
				'ui/**/*.js',
				'api/**/*.js',
				'config/**/*.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
