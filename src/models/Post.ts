import Model from './Model';
import { Schema } from 'mongoose';
import IValidateModel from '../interfaces/IValidateModel';

export default class Post extends Model implements IValidateModel {
  name() {
    return 'post';
  }
  definition() {
    return {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'image'
      },
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
      }
    };
  }
}