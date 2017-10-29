import BaseController from './BaseController';
import Validation from '../utils/Validation';
import { validateLogin } from '../utils/validateLogin';
import { validateRegister } from '../utils/validateRegister';
import * as crypto from 'crypto-js';
import IUser from '../interfaces/data/IUser';
import * as dotenv from 'dotenv';

dotenv.config();

export default class UsersController extends BaseController {
  getLogin() {
    return this.response.render('login');
  }
  async postLogin() {
    const validate = validateLogin(this.request.body);
    if (!validate.isValid) {
      return this.response.render('login', {
        errors: validate.errors
      });
    }
    try {
      const user = await this.model('user').mongo().findOne({ email: this.request.body.email });
      if (!user) {
        return this.response.render('login', {
          errors: {
            email: 'E-mail inválido!'
          }
        });
      }
      const validPass = crypto.AES.decrypt(user.password, process.env.CIPHER_KEY).toString(crypto.enc.Utf8) === this.request.body.password;
      if (!validPass) {
        return this.response.render('login', {
          errors: {
            password: 'Senha inválida!'
          }
        });
      }
      this.request.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      console.log(`user_session: ${this.request.sessionID} | ${user.email} logged`);
      return this.response.redirect('/posts');
    } catch (error) {
      console.log(error);
      return this.response.render('login', {
        errors: {
          email: error.errmsg
        }
      });
    }
  }
  getRegister() {
    return this.response.render('register');
  }
  async postRegister() {
    const validate = validateRegister(this.request.body);
    if (!validate.isValid) {
      return this.response.render('register', {
        errors: validate.errors
      });
    }
    const user: IUser = {
      name: this.request.body.name,
      email: this.request.body.email,
      password: crypto.AES.encrypt(this.request.body.password, process.env.CIPHER_KEY).toString(),
    };
    try {
      const userCreated = await this.model('user').mongo().create(user);
      this.request.session.user = {
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email
      };
      return this.response.redirect('/posts');
    } catch (error) {
      return this.response.render('register', {
        errors: {
          email: 'E-mail ja existe no banco de dados'
        }
      });
    }
  }
  logout() {
    const sId = this.request.sessionID;
    const userEmail = this.request.session.user.email;
    this.request.session.destroy((error) => {
      console.log(`user_session: ${sId} | ${userEmail} destroyed`);
    });
    return this.response.redirect('/login');
  }
}