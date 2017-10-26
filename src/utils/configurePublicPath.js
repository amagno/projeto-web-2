import path from 'path'
import express from 'express'

const publicPath = process.env.PUBLIC_PATH || path.join(__dirname, '..', '..', 'public')

export const configurePublicPath = (app, urlPath = '/public', dir = publicPath) => {
  app.use(urlPath, express.static(dir))
  return dir
}