import BaseController from './controller'


class UsersController extends BaseController {
  constructor(app, io) {
    super(app, io)
    this.getLogin = this.getLogin.bind(this)
  }
  getRegister (req, res) {
    res.render('register')
  }
  getLogin (req, res) {
    console.log(this)
    res.render('login')
  }
}

export default UsersController