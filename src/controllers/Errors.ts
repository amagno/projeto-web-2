import BaseController from './BaseController';


export default class HomeController extends BaseController {
  index() {
    this.response.status(404);
    return this.response.render('error', {
      message: 'Page not found'
    });
  }
}