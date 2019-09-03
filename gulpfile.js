var browserify = require('browserify'),
    gulp = require('gulp');
    vueify = require('vueify'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),

    sourceJsFile = './assets/vue/index.js',
    destJSFolder = './dist/js/',
    destJSFile = 'main.js';


gulp.task('sass', function() {
    gulp.src('./assets/styles/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
});

gulp.task('browserify', function() {
    return browserify(sourceJsFile)
        .transform(vueify)
        .bundle()
        .pipe(source(destJSFile))
        .pipe(gulp.dest(destJSFolder))
        .pipe(browserSync.stream())
});


//Definicja tasków
gulp.task('serve', ['sass', 'browserify'], function () {
    browserSync.init({
        server: './'
    });
    gulp.watch('./assets/styles/**/*.scss', ['sass']);
    gulp.watch(sourceJsFile, ['browserify']);
    gulp.watch('./assets/vue/*.vue', ['browserify']);
    gulp.watch('./*.html', ).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
