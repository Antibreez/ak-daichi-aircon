import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import wrap from 'gulp-wrap'
import wrapJs from 'gulp-wrap-js'
// import plumber from 'gulp-plumber'
// import webpack from 'webpack'
// import webpackStream from 'webpack-stream'
import terser from 'gulp-terser'
import concat from 'gulp-concat'

// const gulp = require("gulp");
// const plumber = require("gulp-plumber");
// const webpack = require("webpack");
// const webpackStream = require("webpack-stream");

export const vendor = () => {
  return gulp
    .src([
      // './node_modules/jquery/dist/jquery.js',
      // './node_modules/jquery-parallax.js/parallax.js',
      // './node_modules/swiper/swiper-bundle.js',
      // './node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
      './source/js/libs/lib.js',
      './node_modules/jquery-ui-bundle/jquery-ui.js',
      './node_modules/select2/dist/js/select2.js',
      // './node_modules/smooth-scrollbar/dist/smooth-scrollbar.js',
      // './node_modules/validator.tool/dist/validator.js',
      // './node_modules/inputmask/dist/jquery.inputmask.js',
      // './node_modules/smoothscroll-for-websites/SmoothScroll.js',
      // './source/js/libs/page-smooth-scroll.js',
      // './node_modules/gsap/dist/gsap.js',
      // './node_modules/gsap/dist/ScrollTrigger.js',
      // './node_modules/gsap/dist/CSSRulePlugin.js',
      // './source/js/libs/lottie.js'
    ])
    .pipe(
      terser({
        format: {
          comments: false,
        },
      })
    )
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js'))
}

export const mainFull = () => {
  return gulp
    .src([
      './source/js/utils/*.js',
      './source/js/common/*.js',
      './source/components/**/*.js',
      './source/js/modules/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'))
}

export const mainMin = () => {
  return gulp
    .src([
      './source/js/utils/*.js',
      './source/js/common/*.js',
      './source/components/**/*.js',
      './source/js/modules/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(
      terser({
        format: {
          comments: false,
        },
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'))
}

const main = gulp.series(mainFull, mainMin)

// export default function scripts() {
//   return gulp
//     .src('source/js/main.js')
//     .pipe(plumber())
//     .pipe(
//       webpackStream({
//         mode: 'development',
//         output: {
//           filename: '[name].min.js',
//         },
//         module: {
//           rules: [
//             {
//               test: /\.m?js$/,
//               exclude: /(node_modules|bower_components)/,
//               use: {
//                 loader: 'babel-loader',
//                 options: {
//                   presets: ['@babel/preset-env'],
//                 },
//               },
//             },
//           ],
//         },
//         devtool: 'source-map',
//         plugins: [
//           new webpack.ProvidePlugin({
//             $: 'jquery',
//             jQuery: 'jquery',
//             'window.jQuery': 'jquery',
//           }), // jQuery (npm i jquery)
//         ],
//       })
//     )
//     .pipe(gulp.dest('build/js'))
// }

export default gulp.parallel(vendor, main)
