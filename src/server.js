import express from 'express'
import expressHandlebars from 'express-handlebars'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import multer from 'multer'
import http from 'http'
import cookieParser from 'cookie-parser'
import { initConnection } from './data/mongo'
import session from 'express-session'
import socketIO from 'socket.io'
import connectMongo from 'connect-mongo'
import { compiler } from './compiler'
import userRoutes from './user/routes'
import fs from 'fs'
import handlebarsIntl from 'handlebars-intl'
import UsersController from './controllers/users'
import userModel from './data/models/user'
import postModel from './data/models/post'
import imageModel from './data/models/image'
// env
const config = dotenv.config()
if (config.error) {
  throw new Error(config.error)
}
// upload
const multiPartFormData = multer({
  dest: process.env.UPLOAD_PATH || 'uploads/'
})
// Database
const mongooseConnection = initConnection()
const MongoStore = connectMongo(session)


// 
const app = express()
const server = http.createServer(app)
const io = socketIO.listen(server)
const hbs = expressHandlebars.create({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
handlebarsIntl.registerWith(hbs.handlebars)
// 
const authMiddleware = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user
  }
  return next()
}
const isAuthenticatedMiddleware = (req, res, next) => {
  if (!req.session.user) {
    io.sockets.emit('message', 'não autorizado')
    return res.redirect('/login')
  }
  return next()
}

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'helloworld123456',
  store: new MongoStore({ mongooseConnection })
}))
app.use(compiler)
app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use(authMiddleware)


userRoutes(app, io)



app.get('/', (req, res) => {
  return res.render('home')
})
//app.use('/post', isAuthenticatedMiddleware)
app.get('/posts', async (req, res) => {
  const posts = await postModel.find({}, {}, {
    sort: {
      createdAt: -1
    }
  }).populate('user', '-password').exec()
  console.log(posts)
  return res.render('posts', {
    posts
  })
})
app.get('/post', isAuthenticatedMiddleware, (req, res) => {
  return res.render('new_post')
})
app.post('/post', multiPartFormData.single('image'), async (req, res) => {
  console.log(req.body)
  console.log(req.file)

  let imageId = null
  let userId = req.session.user.id
  if (req.file) {
    const image = await imageModel.create(req.file)
    imageId = image.id  
  }
  if (req.body) {
    const post = await postModel.create({
      title: req.body.title,
      content: req.body.content,
      image: imageId,
      user: userId
    })

    console.log(post)
  }
  return res.redirect('/posts')
})


app.get('/image/:id', async (req, res) => {
  try {
    const response = await imageModel.findById(req.params.id); 
    res.setHeader('Content-Type', response.mimetype);
    fs.createReadStream(path.resolve(process.env.UPLOAD_PATH, response.filename)).pipe(res)
  } catch (error) {
    res.status(404)
    res.end()
  }
})

// app.post('/api/login', multiPartFormData.array(), (req, res) => {
//   const token = jwt.sign(Object.assign({}, req.body), '123456')
//   console.log(req.headers)
//   res.json({
//     token
//   })
// })
io.sockets.on('connection', (client) => {
  console.log(`Client: ${client} connected to socket.io`)
})
server.listen(process.env.PORT || 3000, process.env.ADDRESS || '127.0.0.1', () => {
  const address = server.address().address
  const port = server.address().port

  console.log(`App is running on http://${address}:${port}`)
})
