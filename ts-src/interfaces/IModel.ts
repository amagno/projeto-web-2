import * as mongoose from 'mongoose';
import Model from '../models/Model';
export default interface IModel {
  name: string;
  model: Model;
}