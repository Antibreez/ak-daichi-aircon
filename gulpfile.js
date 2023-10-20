// import requireDir from 'require-dir'
// console.log(requireDir)
// const gulp = require('gulp')
import gulp from 'gulp'
import watcher from './tasks/watcher.js'
import server from './tasks/server.js'
import clean from './tasks/clean.js'
import copy from './tasks/copy.js'
import styles from './tasks/styles.js'
import html from './tasks/html.js'
import scripts from './tasks/scripts.js'
import rastr from './tasks/rastr.js'
import webp from './tasks/webp.js'
import sprite from './tasks/svg_sprite.js'

// const task = requireDir('./tasks')
// const watcher = task.watcher
// exports.server = task.server
// exports.clean = task.clean
// exports.copy = task.copy
// exports.styles = task.styles
// exports.html = task.html
// exports.scripts = task.scripts
// exports.rastr = task.rastr
// exports.webp = task.webp
// exports.sprite = task.svg_sprite

// Build

export const build = gulp.series(clean, copy, webp, gulp.parallel(styles, html, scripts, rastr, sprite))

export const imageWebp = gulp.series(webp)

// Default

export default gulp.series(
  clean,
  copy,
  webp,
  gulp.parallel(styles, html, scripts, rastr, sprite),
  gulp.series(server.init, watcher)
)
