import IValidateModel from '../interfaces/IValidateModel';
import IValidate from '../interfaces/IValidate';
import Validation from './Validation';
import * as validator from 'validator';
import UserAddress from '../models/UserAddress';
import IUserAddress from '../interfaces/data/IUserAddress';

export const validateUserAddress = (fields: IUserAddress): IValidate => {
  const validation = new Validation(fields, new UserAddress(false)).validate();
    return {
      isValid: validation.isValid(),
      errors: validation.getErrors()
    };
};