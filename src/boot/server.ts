import Application from '../core/Application';
import routes from './routes';
import middlewares from './middlewares';
import models from './models';

Application.start({
  routes,
  middlewares,
  models
}, parseInt(process.env.PORT));