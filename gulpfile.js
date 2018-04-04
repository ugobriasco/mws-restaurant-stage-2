const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task(
  'default',
  ['copy-html', 'styles', 'copy-img', 'dev-scripts', 'sw'],
  function() {
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/js/*.js'), ['dev-scripts'];
    gulp.watch('src/sw.js'), ['sw'];
    gulp.watch('scr/img/*', ['copy-img']);
    gulp.watch('./dist/index.html').on('change', browserSync.reload);

    browserSync.init({
      server: './dist',
      port: 3000
    });
  }
);

gulp.task('copy-html', function() {
  gulp.src('src/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('copy-data', function() {
  gulp.src('src/data/*.json').pipe(gulp.dest('./dist/data'));
});
gulp.task('copy-img', function() {
  gulp
    .src('src/img/*')
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest('dist/img'));
  gulp.src('src/favicon.ico').pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
  gulp
    .src('src/js/**/*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'));
});
gulp.task('dev-scripts', function() {
  gulp
    .src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sw', function() {
  gulp
    .src('src/sw.js')
    .pipe(babel())
    .pipe(concat('sw.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  gulp
    .src('src/scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});
