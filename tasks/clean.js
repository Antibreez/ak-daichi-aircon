import {deleteAsync} from 'del'

export default function clean() {
  return deleteAsync('build')
}
