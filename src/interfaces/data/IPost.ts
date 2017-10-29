import * as mongoose from 'mongoose';
export default interface IPost {
  title: string;
  content: string;
  image: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}