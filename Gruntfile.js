module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['web/**/*'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html', '**/*.png', '**/*.jpg', '**/*.svg', '**/*.json'],
                    dest: 'web'
                }]
            }
        },

        less: {
            dev: {
                options: {
                    paths: ["src/css"]
                },
                files: {
                    "web/css/site.css": "src/css/site.less"
                }
            },
            production: {
                options: {
                    paths: ["src/css"],
                    cleancss: true
                },
                files: {
                    "web/css/site.css": "src/css/site.less"
                }
            }
        },

        browserify: {
            dev: {
                options: {
                    ignore: ['src/js/vendor/**/*.js'],
                    bundleOptions: {
                        debug: true
                    }
                },
                files: {
                    'web/js/app.js': ['src/js/app.js']
                }
            },
            production: {
                options: {
                },
                files: {
                    'web/js/app.js': ['src/js/app.js']
                }
            },
        },

        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false
                },
                files: {
                    'web/js/vendor.js': ['src/js/vendor/**/*.js', '!src/js/vendor/**/*.min.js']
                }
            },

            production: {
                files: {
                    'web/js/vendor.js': ['src/js/vendor/**/*.js', '!src/js/vendor/**/*.min.js'],
                    'web/js/app.js': ['web/js/app.js']
                }
            }
        },

        watch: {
            html: {
                files: ['src/**/*.html', 'src/**/*.jpg', 'src/**/*.png'],
                tasks: ['copy'],
                options: {
                    interrupt: true,
                },
            },

            scripts: {
                files: ['src/**/*.js'],
                tasks: ['browserify:dev'],
                options: {
                    interrupt: true,
                },
            },

            less: {
                files: 'src/**/*.less',
                tasks: ['less:dev']
            },

            img: {
                files: ['src/**/*.png', 'src/**/*.jpg'],
                tasks: ['copy']
            }
        },
    });

    grunt.registerTask('default', ['clean', 'less:dev', 'browserify:dev', 'uglify:dev', 'copy', 'watch']);
    grunt.registerTask('production', ['clean', 'less:production', 'browserify:production', 'uglify:production', 'copy']);
};
