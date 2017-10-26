import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
  fieldname: String,
  originalName: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
}, { timestamps: true, collection: 'images'})

export default mongoose.model('image', imageSchema)