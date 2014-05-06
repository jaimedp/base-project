module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['web/**/*'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html', '**/*.png', '**/*.jpg'],
                    dest: 'web'
                }]
            }
        },

        concat: {
            app: {
                src: [
                    'src/js/**/*.js',
                    'src/js/app.js',

                    '!src/vendor/**/*/js'
                ],
                dest: 'web/js/app.js',
            },
            vendor: {
                src: ['src/vendor/**/*.js'],
                dest: 'web/js/vendor.js',
            },
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

        watch: {
            html: {
                files: ['src/**/*.js', 'src/**/*.html'],
                tasks: ['copy'],
                options: {
                    interrupt: true,
                },
            },

            scripts: {
                files: ['src/**/*.js'],
                tasks: ['concat'],
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

    grunt.registerTask('default', ['clean', 'less:dev', 'concat', 'copy', 'watch']);
};

