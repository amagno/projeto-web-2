import BaseController from './BaseController';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { validatePost } from '../utils/validatePost';
import IPost from '../interfaces/data/IPost';

dotenv.config();

export default class Posts extends BaseController {
  async index() {
    const posts = await this.model('post')
    .mongo()
    .find({}, {}, {
      sort: {
        createdAt: -1
      }
    })
    .populate('user', '-password')
    .exec();

    return this.response.render('posts', {
      posts
    });
  }
  getNewPost() {
    return this.response.render('new_post');
  }
  async postNewPost() {
    let imageCreated: any = { id: undefined };
    if (this.request.file) {
      imageCreated = await this.model('image').mongo().create(this.request.file);
    }
    const post: IPost = {
      title: this.request.body.title,
      content: this.request.body.content,
      image: imageCreated.id,
      user: this.request.session.user.id
    };
    const validate = validatePost(post);
    if (!validate.isValid) {
      if (imageCreated) await this.model('image').mongo().findById(imageCreated.id).remove().exec();
      if (this.request.file) await fs.unlinkSync(this.request.file.path);
      console.log(validate.errors);
      return this.response.render('new_post', {
        errors: validate.errors
      });
    }
    await this.model('post').mongo().create(post);
    return this.response.redirect('/posts');
  }
 }