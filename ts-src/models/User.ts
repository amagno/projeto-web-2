import * as mongoose from 'mongoose';
import Model from './Model';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

class User extends Model {
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
        minlength: 8,
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