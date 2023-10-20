// const requireDir = require("require-dir");
// const task = requireDir("./");
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sourcemap from 'gulp-sourcemaps'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import clean from 'gulp-clean-css'
import rename from 'gulp-rename'
import bulk from 'gulp-sass-bulk-importer'
import chalk from 'chalk'
import server from './server.js'
// const gulp = require("gulp");
// const plumber = require("gulp-plumber");
// const sourcemap = require("gulp-sourcemaps");
// const sass = require("gulp-sass");
// const autoprefixer = require("gulp-autoprefixer");
// const clean = require("gulp-clean-css");
// const rename = require("gulp-rename");
// const bulk = require("gulp-sass-bulk-importer");
// const chalk = require("chalk");

// const server = task.server;
const sass = gulpSass(dartSass)
// import sass from 'gulp-sass'

const stylesFull = () => {
  return gulp
    .src('source/scss/style.scss')
    .pipe(bulk())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        browsers: [
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 11',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      })
    )
    .pipe(gulp.dest('build/css'))
}

const stylesMin = () => {
  return gulp
    .src('source/scss/style.scss')
    .pipe(sourcemap.init())
    .pipe(bulk())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        browsers: [
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 11',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      })
    )
    .pipe(
      clean(
        {
          level: 2,
        },
        details => {
          console.log(chalk`
{bold CSS: ${details.name}}
{bgRed  Original size: ${details.stats.originalSize} bytes }
{bgGreen.black  Minified size: ${details.stats.minifiedSize} bytes }
==================
{bgYellow.black  Saved: ${Math.round(details.stats.efficiency * 100)}% }
`)
        }
      )
    )
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
}

const componentsStyle = () => {
  return gulp
    .src('source/components/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        browsers: [
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24',
          'Explorer >= 11',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6',
        ],
      })
    )
    .pipe(
      gulp.dest(function (file) {
        return file.base
      })
    )
}

const styles = gulp.series(gulp.series(stylesFull, componentsStyle, stylesMin))

export default styles
