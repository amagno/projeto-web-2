import BaseController from './BaseController';
import * as fs from 'fs';
import * as path from 'path';
export default class Images extends BaseController {
  async getImage() {
    if (this.request.params.id) {
      const image = await this.model('image').mongo().findById(this.request.params.id).exec();

      if (image) {
        this.response.setHeader('Content-Type', image.mimetype);
        if (fs.existsSync(image.path)) {
          return fs.createReadStream(image.path).pipe(this.response);
        } else {
          console.log(`image: ${image.path} não existe!`);
        }
      }
    }
    return this.response.end();
  }
}