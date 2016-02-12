module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			dist: {
				src : [
					'js/libs/*.js',
					'js/main.js'
				],
				dest: 'js/build/prod.js',
			}
		},
		uglify: {
			build: {
				src: 'js/build/prod.js',
				dest: 'js/build/prod.min.js'
			}
		},
		sass: {
			dist: {
				options: {
//					style: 'compressed'
					style: 'expanded'
				},
				files: {
					// если 1 файл
					'css/build/prod.css': 'css/style.scss',
					// если много
//					expand: true,
//					cwd: 'css',
//					src: ['*.scss'],
//					dest: '/build',
//					ext: '.css'
				}
			}
		},
		watch: {
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'newer:uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['css/*.scss'],
				tasks: ['newer:sass'],
				options: {
					spawn: false
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// для перекомпиляции ТОЛЬКО измененных файлов
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('init', function(){
		console.log(':-)');
		console.log('======== INIT PROJECT ========');
		grunt.file.write('test.html', '<!DOCTYPE html>\n<html>\n	<head>\n		<title>PROJECT_NAME</title>\n		<meta charset="utf-8">\n		<link rel="stylesheet" href="css/build/prod.css">\n	</head>\n	<body>\n		<!-- content -->\n		<script src="js/build/prod.min.js"></script>\n	</body>\n</html>');
		grunt.file.mkdir('css');
		grunt.file.mkdir('css/build');
//		grunt.file.write('css/build/prod.css', '');
		grunt.file.write('css/style.scss', '');
		grunt.file.mkdir('js');
		grunt.file.mkdir('js/libs');
		grunt.file.mkdir('js/build');
		grunt.file.write('js/main.js', '');
//		grunt.file.write('kek_dir/file.html', 'content');
//		grunt.file.write('file.html', 'content');
	});
	grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);
};