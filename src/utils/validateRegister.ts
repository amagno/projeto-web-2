import IUser from '../interfaces/data/IUser';
import IValidateModel from '../interfaces/IValidateModel';
import IValidate from '../interfaces/IValidate';
import Validation from './Validation';
import * as validator from 'validator';
import User from '../models/User';

export const validateRegister = (fields: IUser): IValidate => {
  const validation = new Validation(fields, new User(false))
    .addValidator('email', {
      message: 'E-mail inválido!',
      validate: validator.isEmail
    })
    .addValidator('name', {
      message: 'Nome inválido!',
      validate: (field: string) => /[a-z\s]+/i.test(field)
    })
    .validate();

    return {
      isValid: validation.isValid(),
      errors: validation.getErrors()
    };
};