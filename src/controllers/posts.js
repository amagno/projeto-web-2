import BaseController from './controller'
import userModel from '../data/models/user'
import postModel from '../data/models/post'

export default class extends BaseController {
  async all(req, res) {
    const posts = await postModel.find({}, {}, {
      sort: {
        createdAt: -1
      }
    })
    .populate('user')
    .exec()
    console.log('LOCALS')
    console.log(res.locals)
    res.render('posts', {
      posts
    }, (error, html) => {
      console.log('posts compiled')
      res.end(html)
    })
  }
}