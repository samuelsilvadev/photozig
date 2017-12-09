'use strict';

const runSequence = require('run-sequence');
const gulp = require('gulp');
const sass = require('gulp-sass');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');

/**
 * Varáveis de configuração de pastas
 */
const _inputFilesScss = './sass/**/*.scss';
const _outputFilesCss = './dist/css/';

const _inputFilesJs =  './js/index.js';
const _outputFilesJs = './dist/js/';

const _inputImages =  './imgs/*';
const _outputImages = './dist/imgs/';

/**
 * Inicio das tasks
 */

gulp.task('default', () => {
    runSequence('browserify', 'babel', 'compress', () => {});
});


gulp.task('sass', () => {
    return gulp
        .src(_inputFilesScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(_outputFilesCss));
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

gulp.task('browserify', () => {
    return browserify(_inputFilesJs)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(_outputFilesJs));
});

gulp.task('babel', () =>
    gulp.src(`${_outputFilesJs}/*.js`)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(_outputFilesJs))
);

gulp.task('compress', (cb) => {
    pump([
            gulp.src(`${_outputFilesJs}/*.js`),
            uglify(),
            gulp.dest(_outputFilesJs)
        ],
    cb
    );
});