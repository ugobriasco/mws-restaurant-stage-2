const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

gulp.task(
  "default",
  ["copy-html", "copy-data", "styles", "copy-img", "scripts"],
  function() {
    gulp.watch("src/*.html", ["copy-html"]);
    gulp.watch("src/data/*.json", ["copy-data"]);
    gulp.watch("src/scss/*.scss", ["styles"]);
    gulp.watch("scr/js/*.js"), ["scripts"];
    gulp.watch("scr/img/*", ["copy-img"]);
    gulp.watch("./dist/index.html").on("change", browserSync.reload);

    browserSync.init({
      server: "./dist",
      port: 3000
    });
  }
);

gulp.task("copy-html", function() {
  gulp.src("src/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("copy-data", function() {
  gulp.src("src/data/*.json").pipe(gulp.dest("./dist/data"));
});
gulp.task("copy-img", function() {
  gulp
    .src("src/img/*")
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest("dist/img"));
});

gulp.task("scripts", function() {
  gulp.src("src/js/**/*.js").pipe(gulp.dest("./dist/js"));
});

gulp.task("styles", function() {
  gulp
    .src("src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});
