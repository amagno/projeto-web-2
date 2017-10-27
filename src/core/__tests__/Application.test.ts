import Application from '../Application';
import IRoute from '../../interfaces/IRoute';
import ICallController from '../../interfaces/ICallController';
import BaseController from '../../controllers/BaseController';
import { Response } from 'express';
import routes from '../../boot/routes';
import * as supertest from 'supertest';

const TestFunction = (opts: ICallController) => {
  return opts.response.send('hello');
};
describe('Test applications is run', () => {
  it('Test get / route', () => {
    const routes: IRoute[] = [
      {
        type: 'get',
        path: '/',
        controller: TestFunction
      }
    ];
    new Application({
      routes
    });
    supertest(Application.express)
    .get('/')
    .expect(200)
    .end();
  });
});