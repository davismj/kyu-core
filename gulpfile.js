var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/main.js")
    .pipe(babel({
    	modules: "common"
    }))
    .pipe(gulp.dest("dist"));
});