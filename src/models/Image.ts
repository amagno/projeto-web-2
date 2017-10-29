import Model from './Model';
import IValidateModel from '../interfaces/IValidateModel';

export default class Image extends Model implements IValidateModel {
  name() {
    return 'image';
  }
  definition() {
    return {
      fieldname: {
        type: String
      },
      originalName: {
        type: String
      },
      encoding: {
        type: String
      },
      mimetype: {
        type: String
      },
      destination: {
        type: String
      },
      filename: {
        type: String
      },
      path: {
        type: String
      },
      size: {
        type: Number
      }
   };
  }
}