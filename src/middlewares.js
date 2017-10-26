import bodyParser from 'body-parser'
import { compiler } from './compiler'

export default [
  compiler,
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
]