var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var del = require("del");
var usemin = require("gulp-usemin");
var cssmin = require("gulp-cssmin");
var rev = require("gulp-rev");
var uglify = require("gulp-uglify");

gulp.task("deleteDistFolder", function(){
  return del("./");
});

gulp.task("optimizeImages", ["deleteDistFolder"], function() {
  return gulp.src(["./app/assets/images/**/*"])
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest("./assets/images"));
});

gulp.task("useminTrigger", ["deleteDistFolder"], function() {
  gulp.start("usemin");
});

gulp.task("usemin", ["styles"], function(){
  return gulp.src("./app/index.html")
  .pipe(usemin({
    css: [function() {return rev()}, function() {return cssmin()}],
    js: [function() {return rev()}, function() {return uglify()}]
  }))
  .pipe(gulp.dest("./"));
});

gulp.task("build", ["deleteDistFolder", "optimizeImages", "useminTrigger"]);
