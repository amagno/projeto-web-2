import * as mongoose from 'mongoose';
import Validation from './Validation';
import * as validator from 'validator';
import IValidateModel from '../interfaces/IValidateModel';
import IValidate from '../interfaces/IValidate';
import ILogin from '../interfaces/data/ILogin';
import User from '../models/User';

class Login implements IValidateModel {
  definition() {
    const def: mongoose.SchemaDefinition = {
      email: new User(false).definition().email,
      password: new User(false).definition().password
    };
    return def;
  }
  name() {
    return '_login';
  }
}

export const validateLogin = (fields: ILogin): IValidate => {
  const validation = new Validation<ILogin>(fields, new Login()).addValidator('email', {
    message: 'E-mail inválido!',
    validate: validator.isEmail
  });
  return {
    isValid: validation.validate().isValid(),
    errors: validation.validate().getErrors()
  };
};