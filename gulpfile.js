const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task(
  'default',
  [
    'copy-html',
    'styles',
    'scripts',
    'lib-scripts',
    'compress-lib-js',
    'sw',
    'copy-img'
  ],
  function() {
    gulp.watch('src/*.html', ['copy-html']);
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/js/*.js'), ['scripts'];
    gulp.watch('src/js/lib/*.js'), ['lib-scripts'];
    gulp.watch('dist/js/*.js'), ['compress-lib-js'];
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

gulp.task('styles', function() {
  gulp
    .src([
      'src/scss/styles.scss',
      'src/scss/styles.md.scss',
      'src/scss/styles.lg.scss'
    ])
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
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp
    .src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('lib-scripts', function() {
  return gulp
    .src('src/js/lib/*.js')
    .pipe(babel())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('compress-lib-js', function(cb) {
  pump(
    [
      gulp.src('dist/js/lib.js'),
      rename('lib.min.js'),
      babel({
        presets: ['es2015']
      }),
      uglify(),
      gulp.dest('./dist/js')
    ],
    cb
  );
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

gulp.task('sw', function() {
  gulp
    .src('src/sw.js')
    .pipe(babel())
    .pipe(concat('sw.js'))
    .pipe(gulp.dest('./dist'));
});
