import * as mongoose from 'mongoose';

export default interface IUserAddress {
  user: mongoose.Types.ObjectId;
  rua: string;
  estado: string;
  cidade: string;
  cep: number;
}