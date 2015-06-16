var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var jshint = require('gulp-jshint');
var gulp = require('gulp');

var jsLibrary = [
  'bower_components/angular/angular.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/materialize/dist/js/materialize.js'
];
var jsApp = [
  'js/app.js',
  'js/routes/config.js',
  'js/services/*.js',
  'js/controllers/*.js'
];
gulp.task('library', function() {
  return gulp.src(jsLibrary)
    .pipe(concat('library.js'))
    .pipe(jshint())
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(gulp.dest('build'))
});
gulp.task('angular', function() {
  return gulp.src(jsApp)
    .pipe(concat('angular.js'))
    .pipe(jshint())
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(gulp.dest('build'))
});
gulp.task('app', function() {
  return gulp.src(['build/library.js', 'build/angular.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'))
});
gulp.task('default', function() {
  gulp.run('library', 'angular', 'app');
});
