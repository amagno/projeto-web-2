import BaseController from './BaseController';


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
  newPostView() {
    return this.response.render('new_post');
  }
  async newPost() {
    console.log(this.request.body);
  }
 }