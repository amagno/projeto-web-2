import Model from './Model';
import { Schema } from 'mongoose';

export default class Post extends Model {
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