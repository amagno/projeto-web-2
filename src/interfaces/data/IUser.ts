import * as mongoose from 'mongoose';

export default interface IUser {
  id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  address: mongoose.Types.ObjectId;
}