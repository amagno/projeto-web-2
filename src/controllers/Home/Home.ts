import BaseController from '../BaseController';


export default class HomeController extends BaseController {
  index() {
    this.response.render('home');
  }
}