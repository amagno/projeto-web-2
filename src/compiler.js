import webpack from 'webpack'
import path from 'path'
import expressHandlebars from 'express-handlebars'

const config = require(path.join(__dirname, '..', 'webpack.config.js'))

let compiled = false
let file = null

export const compiler = async (req, res, next) => {
  if (!compiled || !file) {
    try {
      file = await compile
      console.log(`File ${file} compiled!`)      
    } catch (error) {
      console.error(error)
    }
  }
  console.log(`Client file is updated`)
  res.locals.clientCompiled = file
  return next()
}


export const compile = new Promise((resolve, reject) => {
  webpack(config).run((error, status) => {
    if (error) {
      reject(error)
    }
    compiled = true
    resolve(`${status.hash}.js`)
  })
})