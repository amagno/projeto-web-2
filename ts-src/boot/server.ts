import Application from '../core/Application';
import routes from './routes';
import middlewares from './middlewares';
import models from './models';
import * as dotenv from 'dotenv';

dotenv.config();


Application.start({
  routes,
  middlewares,
  models
}, parseInt(process.env.PORT), process.env.ADDRESS);