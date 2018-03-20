
/**
 * Creates server and client side docs with jsduck and deploy them to the
 * configured FTP-Server.
 *
 * @class tasks.deploy-docs
 * @param grunt
 */
module.exports = function (grunt) {
  grunt.registerTask('deploy-docs', [
    'docs',
    'ftp_push'
  ]);
};
