import * as mongoose from 'mongoose';
import Model from './Model';
import IValidateModel from '../interfaces/IValidateModel';

class User extends Model implements IValidateModel {
  definition() {
    const definition: mongoose.SchemaDefinition = {
      name: {
        type: String,
        required: true,
        minlength: 6
      },
      email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
      },
      password: {
        type: String,
        required: true,
        minlength: 6
      }
    };
    return definition;
  }
  name() {
    return 'user';
  }
}
export default User;