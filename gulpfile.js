'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	rigger = require('gulp-rigger'),
	pug = require('gulp-pug'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;





var path = {
	build: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/',
		uploads: 'dist/uploads/',
		pug: 'dist/',
		copypug: 'dist/blocks/',
		video: 'dist/video/'
	},
	src: { //Пути откуда брать исходники
		html: 'source/*.pug',//Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
		js: 'source/js/all.js',//В стилях и скриптах нам понадобятся только main файлы
		style: 'source/sass/all.scss',
		img: 'source/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
		fonts: 'source/fonts/**/*.*',
		uploads: 'source/uploads/**/*.*',
		pug: 'source/*.pug',
		copypug: 'source/blocks/**/*.pug',
		video: 'source/video/**/*.*'
	},
	watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		html: 'source/**/*.pug',
		js: 'source/**/*.js',
		style: 'source/**/*.scss',
		img: 'source/img/**/*.*',
		fonts: 'source/fonts/**/*.*',
		uploads: 'source/uploads/**/*.*',
		pug: 'source/**/*.pug',
		copypug: 'source/**/*.pug',
		video: 'source/video/**/*.*'
	},
	clean: './dist'
};


var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "Supply_local"
};

// gulp.task('html:build', function () {
//     gulp.src(path.src.html) //Выберем файлы по нужному пути
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
//         .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
// });

gulp.task('copypug:build', function () {
	gulp.src(path.src.copypug) //Выберем файлы по нужному пути
		.pipe(gulp.dest(path.build.copypug)) //Выплюнем их в папку build
		.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('copyvideo:build', function () {
	gulp.src(path.src.video) //Выберем файлы по нужному пути
		.pipe(gulp.dest(path.build.video)) //Выплюнем их в папку build
		.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('pug:build', function () {
	gulp.src(path.src.pug) //Выберем файлы по нужному пути
		.pipe(rigger()) //Прогоним через rigger
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(path.build.pug)) //Выплюнем их в папку build
		.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
	gulp.src(path.src.js) //Найдем наш main файл
		.pipe(rigger()) //Прогоним через rigger
		.pipe(uglify()) //Сожмем наш js
		.pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
		.pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
	gulp.src(path.src.style) //Выберем наш main.scss
		.pipe(rigger())
		.pipe(sass()) //Скомпилируем
		.pipe(prefixer()) //Добавим вендорные префиксы
		.pipe(cleanCSS({compatibility: 'ie11'})) //Сожмем
		.pipe(gulp.dest(path.build.css)) //И в build
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	gulp.src(path.src.img) //Выберем наши картинки
		// .pipe(imagemin({ //Сожмем их
		//     progressive: true,
		//     svgoPlugins: [{removeViewBox: false}],
		//     use: [pngquant()],
		//     interlaced: true
		// }))
		.pipe(gulp.dest(path.build.img)) //И бросим в build
		.pipe(reload({stream: true}));
});

gulp.task('uploads:build', function () {
	gulp.src(path.src.uploads) //Выберем наши картинки
		// .pipe(imagemin({ //Сожмем их
		//     progressive: true,
		//     svgoPlugins: [{removeViewBox: false}],
		//     use: [pngquant()],
		//     interlaced: true
		// }))
		.pipe(gulp.dest(path.build.uploads)) //И бросим в build
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
	watch([path.watch.copypug], function(event, cb) {
		gulp.start('copypug:build');
	});
	watch([path.watch.pug], function(event, cb) {
		gulp.start('pug:build');
	});
	watch([path.watch.style], function(event, cb) {
		gulp.start('style:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.uploads], function(event, cb) {
		gulp.start('uploads:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
	watch([path.watch.video], function(event, cb) {
		gulp.start('copyvideo:build');
	});
});

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('default', ['copypug:build', 'pug:build', 'style:build', 'js:build', 'image:build', 'fonts:build', 'uploads:build', 'copyvideo:build', 'webserver', 'watch']);







