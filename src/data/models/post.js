import mongoose, { Schema } from 'mongoose'


const userSchema = Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'image'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, { collection: 'posts', timestamps: true })

export default mongoose.model('post', userSchema)