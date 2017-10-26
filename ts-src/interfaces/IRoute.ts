import { Handler } from 'express';
import IMiddleware from './IMiddleware';

export default interface IRoute {
  type: 'get' | 'post';
  path: string;
  controller?: string;
  render?: string;
  middlewares?: IMiddleware[];
}