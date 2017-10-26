import BaseController from '../BaseController';


export default class HomeController extends BaseController {
  index() {
    return this.response.render('home');
  }
}