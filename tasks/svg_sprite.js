import gulp from 'gulp'
import svgstore from 'gulp-svgstore'
import rename from 'gulp-rename'

// const gulp = require("gulp");
// const svgstore = require("gulp-svgstore");
// const rename = require("gulp-rename");

export default function sprite() {
  return gulp
    .src('source/img/icons/*.svg')
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}
