import { Handler } from 'express';
import IMiddleware from './IMiddleware';
import ICallController from './ICallController';
import BaseController from '../controllers/BaseController';


export default interface IRoute {
  type: 'get' | 'post';
  path: string;
  controller?: string | any;
  render?: string;
  middlewares?: IMiddleware[];
  io?: boolean;
}