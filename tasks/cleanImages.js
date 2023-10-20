import {deleteAsync} from 'del'

export default function cleanAll() {
  return deleteAsync('build/img')
}
