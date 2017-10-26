import mongoose, { Schema } from 'mongoose'


const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'users', timestamps: true })

export default mongoose.model('user', userSchema)