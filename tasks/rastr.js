import gulp from 'gulp'
import changed from 'gulp-changed'
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin'
import plumber from 'gulp-plumber'

// const gulp = require("gulp");
// const changed = require("gulp-changed");
// const imagemin = require("gulp-imagemin");
// const recompress = require("imagemin-jpeg-recompress");
// const pngquant = require("imagemin-pngquant");
// const plumber = require("gulp-plumber");

export default function rastr() {
  return gulp
    .src(['source/img/**/*.+(png|jpg|jpeg|gif|svg|ico)', '!source/img/icons/*.svg', '!source/img/sprites.svg'])
    .pipe(plumber())
    .pipe(changed('build/img'))
    .pipe(
      imagemin([
        gifsicle({interlaced: true}),
        optipng({optimizationLevel: 4}),
        svgo(),
        mozjpeg({quality: 85, progressive: true}),
      ])
    )
    .pipe(gulp.dest('build/img'))
}
