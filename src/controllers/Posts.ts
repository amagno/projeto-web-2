import BaseController from './BaseController';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { validatePost } from '../utils/validatePost';
import IPost from '../interfaces/data/IPost';

dotenv.config();

export default class Posts extends BaseController {
  async index() {
    console.log(this.response.locals);
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
        posts,
        helpers: {
          isDelete: (postId: string, userId: string) => {
            const user = this.request.session.user;
            if (user) {
              if (userId.toString() === user.id.toString()) {
                return `<a href="/post/delete/${postId}" class="bt-delete-post">
                <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                </a>`;
              }
            }
          }
        }
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
  async getDeletePost() {
    const postId = this.request.params.id;
    const user = this.request.session.user;
    if (postId && user) {
      try {
        const post = await this.model('post').mongo().findById(postId);
        if (post.user.toString() === user.id.toString()) {
          await this.model('post').mongo().findByIdAndRemove(post.id);
          return this.response.redirect('/posts');
        }
      } catch (error) {
        return this.response.render('error', {
          errors: {
            post: `post: ${postId} não encontrado`
          },
          message: 'Error on delete post'
        });
      }
    }
    return this.response.render('error', {
      errors: {
        auth: 'Não autorizado'
      },
      message: 'Error on delete post'
    });
  }
 }