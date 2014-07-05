module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      'public/build/javascripts/home.js': ['public/javascripts/home.js'],
      'public/build/javascripts/notification.js': ['public/javascripts/notification.js']
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/css/',
        src: ['*.css'],
        dest: 'public/build/css/'
      }
    },
    watch: {
      files: ["public/javascripts/**/*.js", 'public/css/**/*.css'],
      tasks: ['browserify', 'cssmin']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'cssmin']);
};
