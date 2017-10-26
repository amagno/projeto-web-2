import { registerFormValid, loginFormValid } from './validator'
import userModel from '../data/models/user'
import cryptoJS, { AES } from 'crypto-js'


if (!process.env.CIPHER_KEY) {
  throw new Error('Plz define CIPHER_KEY on env')
}

const verifyPassword = (password, match) => {
  const decrypted = AES.decrypt(password, process.env.CIPHER_KEY).toString(cryptoJS.enc.Utf8)
  return decrypted === match
}

export default (app, io) => {
  app.get('/login', (req, res) => {
    return res.render('login')
  })
  app.get('/logout', (req, res) => {
    delete req.session.user
    delete res.locals.user
    io.sockets.emit('message', 'logout')
    res.redirect('/')
  })
  app.get('/register', (req, res) => {
    return res.render('register')
  })
  app.post('/register', async (req, res) => {
    const validator = registerFormValid(req.body)
    if (validator.error) {
      io.sockets.emit('message', validator.message)
      return res.redirect('/register')
    }

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: AES.encrypt(req.body.password, process.env.CIPHER_KEY)
    }
    console.log(data)
    try {
      const user = await userModel.create(data)
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email
      }
      return res.redirect('/post')
    } catch (error) {
      io.sockets.emit('message', error.message)
      return res.redirect('/register')
    }
  })
  app.post('/login', async (req, res) => {
    if (!loginFormValid(req.body, io)) {
      return res.redirect('/login')
    }
    const user = await userModel.findOne({
      email: req.body.email
    })
    
    if (!user) {
      io.sockets.emit('message', 'e-mail inválido!')
      return res.redirect('/login')
    }
    if(!verifyPassword(user.password, req.body.password)) {
      io.sockets.emit('message', 'senha inválida!')
      return res.redirect('/login')
    }
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    }
    return res.redirect('/post')
  })
}