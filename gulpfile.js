'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var minifyCss = require('gulp-minify-css');
var autoPrefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var react = require('gulp-react');

//brows

var config = {
  dest: './public',
  html: {
    src: './__web/index.html',
    dest: './public'
  },
  styles: {
    src: './__styles/index.styl',
    name: 'app.css',
    dest: './public/css'
  },
  scripts: {
    src: './__app/**/*.js',
    build: './build',
    entry: './build/index.js',
    name: 'app.js',
    dest: './public/js'
  }
};

gulp.task('server', ['build', 'watchTask'], function() {
  gulp.src(config.dest)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('build', ['assemble-html', 'styles', 'assemble-scripts'], function() {

});

gulp.task('assemble-html', ['clean'], function() {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dest));
});

gulp.task('clean', [], function() {
  return gulp.src([config.dest, config.scripts.build], {
      read: false
    })
    .pipe(clean());
});


gulp.task('styles', ['clean'], function() {
  return gulp.src(config.styles.src)
    .pipe(stylus())
    .pipe(autoPrefix())
    .pipe(minifyCss())
    .pipe(rename(config.styles.name))
    .pipe(gulp.dest(config.styles.dest))
});

gulp.task('watchTask', function() {
  gulp.watch(config.styles.src, ['build']);
  gulp.watch(config.scripts.src, ['build']);
  gulp.watch(config.html.src, ['build']);
})

gulp.task('assemble-scripts', ['reactify-scripts'], function() {
  return gulp.src(config.scripts.entry)
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename(config.scripts.name))
    .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('reactify-scripts', ['clean'], function() {
  return gulp.src(config.scripts.src)
    .pipe(react())
    .pipe(gulp.dest(config.scripts.build));
});


gulp.task('test', shell.task(['npm test']));
