import IRoute from './IRoute';
import IMiddleware from './IMiddleware';
import Model from '../models/Model';

export default interface IApplicationOptions {
  routes: IRoute[];
  middlewares: IMiddleware[];
  models: Model[];
}