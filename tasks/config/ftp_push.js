module.exports = function (grunt) {

	grunt.config.set('ftp_push', {
		docs: {
			options: require(process.cwd() + '/config/connections').connections.ftpdocs,
			files: [
				{
					expand: true,
					cwd: 'docs',
					src: [
						'**/*'
					]
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-ftp-push');
};