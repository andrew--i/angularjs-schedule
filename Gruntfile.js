module.exports = function (grunt) {

  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-usemin');
  require('load-grunt-config')(grunt, {
    jitGrunt: {
      staticMappings: {
        configureProxies: 'grunt-connect-proxy',
        protractor: 'grunt-protractor-runner'
      }
    }
  });
};