module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['web/**/*'],

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html', '**/*.png', '**/*.jpg', '**/*.js'],
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

        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.html'],
                tasks: ['copy'],
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

    grunt.registerTask('default', ['clean', 'less:dev', 'copy', 'watch']);
};

