// const gulp = require('gulp')
import gulp from 'gulp'
import server from './server.js'
import styles from './styles.js'
import scripts from './scripts.js'
import html from './html.js'
import webp from './webp.js'
import rastr from './rastr.js'
import sprite from './svg_sprite.js'

// const requireDir = require('require-dir')
// const task = requireDir('./')

const reload = server.reload

export default function watcher() {
  gulp.watch(['source/scss/**/*.scss', 'source/components/**/*.scss'], gulp.series(styles))
  gulp.watch('source/js/**/*.js', gulp.series(scripts, reload))
  gulp.watch('source/components/**/*.js', gulp.series(scripts, reload))
  gulp.watch(['source/*.html', 'source/components/**/*.html'], gulp.series(html, reload))
  gulp.watch(
    ['source/img/**/*.+(png|jpg|jpeg|gif|svg|ico)', '!source/img/icons/*.svg'],
    gulp.series(webp, rastr, reload)
  )
  gulp.watch('source/img/icons/*.svg', gulp.series(sprite, reload))
}
