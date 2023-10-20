import gulp from 'gulp'
import changed from 'gulp-changed'
import gulpWebp from 'gulp-webp'
import plumber from 'gulp-plumber'
import imagemin, {mozjpeg, optipng} from 'gulp-imagemin'
import notify from 'gulp-notify'
import debug from 'gulp-debug'

// const gulp = require("gulp");
// const changed = require("gulp-changed");
// const gulpWebp = require("gulp-webp");
// const plumber = require("gulp-plumber");

const onError = function(err) {
  notify.onError({
    title: "Error in " + err.plugin,
    message: err.toString(),
  })(err);

  this.emit('end')
}

export default function webp() {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(plumber())
    .pipe(changed('build/img'))
    .pipe(gulpWebp({quality: 80}))
    .pipe(gulp.dest('build/img'))
}

