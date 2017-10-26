export default class BaseController {
  constructor(app, io) {
    this.app = app
    this.io = io
  }
}