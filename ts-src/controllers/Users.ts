import BaseController from './BaseController';

export default class UsersController extends BaseController {
  getLogin() {
    return this.response.render('login');
  }
  postLogin() {
    console.log(this.request.body);
  }
}