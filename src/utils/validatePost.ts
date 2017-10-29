import IPost from '../interfaces/data/IPost';
import IValidate from '../interfaces/IValidate';
import Validation from './Validation';
import Post from '../models/Post';



export const validatePost = (fields: IPost): IValidate => {
  const validation = new Validation<IPost>(fields, new Post(false)).validate();
  return {
    isValid: validation.isValid(),
    errors: validation.getErrors()
  };
};