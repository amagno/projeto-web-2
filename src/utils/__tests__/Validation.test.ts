import { expect } from 'chai';
import * as validator from 'validator';
import Validation from '../Validation';
import Model from '../../models/Model';
import * as mongoose from 'mongoose';
interface ITestModel {
  testing_field1: string;
  testing_field2: string;
  testing_field3?: string;
}
class TestModel extends Model {
  name() {
    return 'test';
  }
  definition() {
    const definition: mongoose.SchemaDefinition = {
      testing_field1: {
        type: String,
        required: true
      },
      testing_field2: {
        type: String,
        required: true
      },
      testing_field3: {
        type: String,
      }
    };
    return definition;
  }
}
describe('Test validator', () => {
  let values: ITestModel;
  let model: Model;
  before(() => {
    values = {
      testing_field1: 'hello world',
      testing_field2: 'hello world'
    };
    model = new TestModel();
  });
  after(() => {
    values = undefined;
    model = undefined;
  });
  it('test postive validation validate().isValid()', () => {
    const val = new Validation<ITestModel>(values, model);
    expect(val.validate().isValid()).to.equal(true);
  });
  it('test negative validation on required field validate().isValid()', () => {
    const fail_values: ITestModel = {
      testing_field1: '',
      testing_field2: '',
    };
    const validation = new Validation<ITestModel>(fail_values, model);
    const errors = validation.validate().getErrors();
    console.log(errors);
    expect(Object.keys(errors).length).to.equal(2);
    expect(validation.validate().isValid()).to.equal(false);
  });
  it('test addValidation(key: string, validator: IValidator) with error messsage', () => {
    const validation = new Validation<ITestModel>(values, model);
    const msg = 'error msg';
    validation.addValidator(
      'testing_field2',
      {
        validate: (value) => false,
        message: msg
      }
    );
    console.log(validation.validate().getErrors());
    expect(validation.validate().getErrors().testing_field2).to.equal(msg);
    expect(validation.validate().isValid()).to.equal(false);
  });
});