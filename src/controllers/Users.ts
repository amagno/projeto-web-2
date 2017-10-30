import BaseController from './BaseController';
import Validation from '../utils/Validation';
import { validateLogin } from '../utils/validateLogin';
import { validateRegister } from '../utils/validateRegister';
import * as crypto from 'crypto-js';
import IUser from '../interfaces/data/IUser';
import * as dotenv from 'dotenv';
import { validateUserAddress } from '../utils/validadeUserAddress';
import IUserAddress from '../interfaces/data/IUserAddress';
import * as mongoose from 'mongoose';

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
    try {
      const userId = mongoose.Types.ObjectId();
      const address: IUserAddress = {
        user: userId,
        rua: this.request.body.rua,
        estado: this.request.body.estado,
        cidade: this.request.body.cidade,
        cep: parseInt(this.request.body.cep.replace('-', ''))
      };
      const addressCreated = await this.model('user_address').mongo().create(address);
      const user: IUser = {
        id: userId,
        name: this.request.body.name,
        email: this.request.body.email,
        password: crypto.AES.encrypt(this.request.body.password, process.env.CIPHER_KEY).toString(),
        address: addressCreated.id
      };
      const validateUser = validateRegister(user);
      const validateAddress = validateUserAddress(address);
      if (!validateUser.isValid || !validateAddress.isValid) {
        await this.model('user__address').mongo().findByIdAndRemove(addressCreated.id);
        return this.response.render('register', {
          errors: {
            ...validateUser.errors,
            ...validateAddress.errors
          }
        });
      }
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
  async getUserInfo() {
    const userSess = this.request.session.user;
    if (userSess) {
      const user = await this.model('user').mongo().findById(userSess.id).exec();
      const address = await this.model('user_address').mongo().findById(user.address);
      console.log(address);
      return this.response.render('user_info', {
        user,
        address
      });
    }

    return this.response.render('error', {
      errors: {
        auth: 'nao autorizado'
      }
    });
  }
}