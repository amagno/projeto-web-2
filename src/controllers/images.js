import BaseController from './controller'
import imageModel from '../data/models/image'
import path from 'path'
import fs from 'fs'


class ImagesController extends BaseController {
  async getById(req, res) {
    const id = req.params.id
    try {
     const image = await imageModel.findById(id.toString()).exec()
     res.setHeader('Content-Type', image.mimetype)
     fs.createReadStream(path.resolve(process.env.UPLOAD_PATH, image.filename)).pipe(res)
    } catch (error) {
      console.log(error.message)
      res.send(error.message)
    }
    
  }
}

export default ImagesController