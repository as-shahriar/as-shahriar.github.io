const gulp = require("gulp");
const { task, src, dest, series, watch } = gulp;
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require('gulp-htmlmin');
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");

task("style", (done) => {
    src("assets/style.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(cleanCSS())
      .pipe(dest("assets/"));
  
    done();
  });

task('html', (done) => {
    src('src/index.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest('./'));
      done();
  });

  task("minjs", (done) => {
    src("assets/script.js")
      .pipe(uglify())
      .pipe(rename({ suffix: ".min" }))
      .pipe(dest("assets"));
    done();
  });

  task("watch", function () {
    watch("assets/style.scss", series("style"));
    watch("assets/script.js", series("minjs"));
    watch("src/index.html", series("html"));
  });



task('default',series("style","html","minjs"));