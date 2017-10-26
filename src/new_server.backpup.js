import express from 'express'
import http from 'http'
import path from 'path'
import socketIO from 'socket.io'
import multer from 'multer'
// 
import { initConnection } from './data/mongo'
import { configureHbsView } from './utils/configureView'



const app = express()
const server = http.createServer(app)
const io = socketIO.listen(server)
const mongooseConnection = initConnection()
const multiPartFormData = multer({
  dest: process.env.UPLOAD_PATH || 'uploads/'
})

configureHbsView(app)
app.use('/public', express.static(path.join(__dirname, '..', 'public')))



const routes = [
  {
    type: 'get',
    path: '/',
    render: 'home'
  },
  {
    type: 'get',
    path: '/image/:id',
    controller: 'images@getById'
  },
  {
    type: 'get',
    path: '/posts',
    controller: 'posts@all',
    middlewares: [
      'testing'
    ]
  }
]

routes.forEach(route => {
  const middlewares = route.middlewares || []
  if (middlewares.length) {
    route.middlewares.forEach(middleware => {
      const middlewareFunction = require(path.join(__dirname, 'middlewares', middleware)).default
      app.use(route.path, middlewareFunction)
    })
  }
  if (route.render) {
    app[route.type](route.path, (req, res) => {
      return res.render(route.render)
    })
    return
  }
  if (route.controller) {
    const controllerText = route.controller.split('@')
    const controllerPath = path.join(__dirname, 'controllers', controllerText[0] + '.js')
    console.log(controllerPath)
    const ControllerClass = require(controllerPath).default
    const controller = new ControllerClass(app, io)
    
    if (!controllerText[1] || typeof controller[controllerText[1]] === 'undefined') {
      throw new Error(`${controllerText[1] || 'define method of controle @method'} : function not define on controller`)
    }
    return app[route.type](route.path, controller[controllerText[1]])
  }
  
})

io.sockets.on('connection', (client) => {
  console.log(`Client: ${client} connected to socket.io`)
})
server.listen(process.env.PORT || 3000, process.env.ADDRESS || '127.0.0.1', () => {
  const address = server.address().address
  const port = server.address().port

  console.log(`App is running on http://${address}:${port}`)
})
