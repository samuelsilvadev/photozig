'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

/**
 * Varáveis de configuração de pastas
 */
const _inputFilesScss = './sass/**/*.scss';
const _outputFilesCss = './public/css/';

const _inputFilesJs =  './js/*.js';
const _outputFilesJs = './public/js/';

const _inputImages =  './imgs/*';
const _outputImages = './public/imgs/';

/**
 * Inicio das tasks
 */

gulp.task('sass', () => {
    return gulp
        .src(_inputFilesScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(_outputFilesCss));
});

gulp.task('minify', () => {
    gulp.src(_inputFilesJs)
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: [],
            ignoreFiles: []
        }))
        .pipe(gulp.dest(_outputFilesJs))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('imagemin', () => {
    gulp.src(_inputImages)
        .pipe(imagemin())
        .pipe(gulp.dest(_outputImages))
});

gulp.task('watch', ['browserSync'], () => {
    gulp.watch(_inputFilesScss, ['sass']); 
})

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});