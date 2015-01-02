module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n\n',

  // Clean Distribution folder
    clean: {
      dist: 'dist'
    },


    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/bootstrapExtended.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dist: [
        'dist/css/<%= pkg.name %>.css'
      ]
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },

    watch: {
        grunt: { files: ['Gruntfile.js'] },
        less: {
            files: 'less/**/*.less',
            tasks: ['default']
        },
        demo: { files: 'demo/*.html' },
        options: {
            livereload: true
        }
    },

    connect: {
      server1: {
        options: {
            hostname: '*',
            port: 8083,
            base: '.',
            keepalive: true,
            open: true
        }
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');


grunt.registerTask('default', ['clean', 'less', 'csslint', 'cssmin']);

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.registerTask('dev',['connect:server1']);


};