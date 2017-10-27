import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import IModel from './IModel';

export default interface ICallController {
  request: Request;
  response: Response;
  models?: IModel[];
}
