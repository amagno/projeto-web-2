import * as mongoose from 'mongoose';
import * as validator from 'validator';
import IValidateModel from '../interfaces/IValidateModel';
interface IModelValidate {
  [key: string]: any;
}
interface IErrors {
  [key: string]: string;
}
interface IValidator {
  validate(value: any): boolean;
  message: string;
}
interface IValidators {
  [key: string]: IValidator;
}
export default class Validation<ModelInterface extends IModelValidate> {
  private definitions: mongoose.SchemaDefinition;
  private values: ModelInterface;
  private errors: IErrors = {};
  private validators: IValidators = {};
  constructor(values: ModelInterface, model: IValidateModel) {
    this.definitions = model.definition();
    this.values = values;
  }
  public addValidator(key: string, validator: IValidator) {
    this.validators[key] = validator;
    return this;
  }
  public validate() {
    Object.keys(this.definitions).forEach((key) => {
      this.fieldValidation(key, this.definitions[key], this.values[key]);
    });
    return this;
  }
  public getErrors(): IErrors {
    return this.errors;
  }

  /**
   *
   *
   * @returns {boolean}
   * @memberof Validation
   */
  public isValid(): boolean {
    if (Object.keys(this.errors).length === 0) {
      return true;
    }
    return false;
  }

  /**
   *
   *
   * @private
   * @param {string} key
   * @param {mongoose.SchemaTypeOpts<any>} field
   * @param {string} value
   * @returns
   * @memberof Validation
   */
  private fieldValidation(key: string, field: mongoose.SchemaTypeOpts<any>, value: string) {
    // Validate required field
    if (field.required) {
      if (!value) {
        return this.setError(key, 'Campo deve ser preenchido');
      }
    }
    // Validate min field
    const min = field.minlength || field.min;
    if (min) {
      if (value.length < min) {
        return this.setError(key, `Deve ter no minimo ${min} caracteres`);
      }
    }
    // Validate max field
    const max = field.maxlength || field.max;
    if (max) {
      if (value.length > max) {
        return this.setError(key, `Deve ter no maximo ${max} caracteres`);
      }
    }
    // Validate with add validators
    if (this.validators[key]) {
      if (!this.validators[key].validate(value)) {
        return this.setError(key, this.validators[key].message);
      }
    }
  }

  /**
   * @private
   * @param {string} key
   * @param {string} message
   * @memberof Validation
   */
  private setError(key: string, message: string) {
    this.errors[key] = message;
  }

}