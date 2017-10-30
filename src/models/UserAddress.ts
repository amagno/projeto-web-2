import * as mongoose from 'mongoose';
import Model from './Model';
import IValidateModel from '../interfaces/IValidateModel';

class UserAddress extends Model implements IValidateModel {
  definition() {
    const definition: mongoose.SchemaDefinition = {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      rua: {
        type: String,
        required: true,
        minlength: 6
      },
      estado: {
        type: String,
        required: true,
        maxlength: 2
      },
      cidade: {
        type: String,
        required: true,
        minlength: 6
      },
      cep: {
        type: Number,
        required: true,
        minlength: 8
      }
    };
    return definition;
  }
  name() {
    return 'user_address';
  }
}
export default UserAddress;