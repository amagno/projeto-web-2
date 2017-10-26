import express from 'express'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'
import multer from 'multer'
// 
import { initConnection } from './data/mongo'
import { configureHbsView } from './utils/configureView'
import { configureRoutes } from './utils/configureRoutes'
import { configureMiddlewares } from './utils/configureMiddlewares'
import { configurePublicPath } from './utils/configurePublicPath'

export default class Application {
  constructor(routes = [], middlewares =[], opts = {}) {
    this.app = express()
    this.view = configureHbsView(this.app)  
    this.server = http.createServer(this.app)    
    this.io = socketIO.listen(this.server)
    this.middlewares = configureMiddlewares(middlewares, this.app)    
    this.routes = configureRoutes(routes, this.app, this.io)
    this.publicPath = configurePublicPath(this.app)     
    this.mongooseConnection = initConnection()
    this.opts = opts
    this.io.sockets.on('connection', (client) => {
      console.log(`Client: ${client} connected to socket.io`)
    })

  }


  listen(port = 3000, addr = '127.0.0.1') {
    this.server.listen(port, addr, () => {
      const address = this.server.address().address
      const port = this.server.address().port
      console.log(`App is running on http://${address}:${port}`)
    })
  }
}