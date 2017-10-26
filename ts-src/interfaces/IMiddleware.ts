import { Handler } from 'express';
export default interface IMiddleware {
  path?: string;
  middleware: Handler;
}