var pkgJson = require('./package.json');
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bump: {
            options: {
                files: ['package.json'],
                push: true,
                commitMessage: 'Release v%VERSION% Eric Grill',
                pushTo: 'origin',
                updateConfigs: ['pkg']
            }
        },
    });
    grunt.loadNpmTasks('grunt-bump');
    grunt.registerTask('default', ['bump']);
}
