// const sync = require("browser-sync").create();
import browserSync from 'browser-sync'
const sync = browserSync.create()

const server = {
  init: done => {
    sync.init({
      server: {
        baseDir: 'build',
      },
      cors: true,
      notify: false,
      ui: false,
    })
    done()
  },
  reload: done => {
    sync.reload()
    done()
  },
  stream: sync.stream,
}

export default server
