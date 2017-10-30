import BaseController from './BaseController';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { validatePost } from '../utils/validatePost';
import IPost from '../interfaces/data/IPost';

dotenv.config();

export default class Posts extends BaseController {
  async index() {
    const postsModel = this.model('post').mongo();
    const userModel = this.model('user').mongo();
    let search = {};
    const q = this.request.query.q;
    const f = this.request.query.f;
    if (q && f === 'title') {
      search = {
        title: { $regex: new RegExp(q), $options: 'i' }
      };
    }
    if (q && f === 'content') {
      search = {
        content: { $regex: new RegExp(q), $options: 'i' }
      };
    }
    if (q && f === 'email') {
      const user = await userModel.find({
        email: { $regex: new RegExp(q), $options: 'i' }
      }) || [];
      const aux: any = {
        $or: []
      };
      user.forEach(user => {
        aux.$or.push({ user: user.id });
      });
      search = aux;
    }
    try {
      const posts = await postsModel
      .find(search, {}, {
        sort: {
          createdAt: -1
        }
      })
      .populate('user', '-password')
      .exec();
      return this.response.render('posts', {
        posts
      });
    } catch (error) {
      console.log(error);
    }
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