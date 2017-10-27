import * as express from 'express';
import * as expressHandlebars from 'express-handlebars';
import * as path from 'path';
import IRoute from '../interfaces/IRoute';
import Core from './Core';
import IMiddleware from '../interfaces/IMiddleware';
import * as mongoose from 'mongoose';
import Model from '../models/Model';
import IModel from '../interfaces/IModel';
import IApplicationOptions from '../interfaces/IApplicationOptions';
import ICallController from '../interfaces/ICallController';
// import handlerbarsIntl from 'handlebars-intl';
import * as SocketIO from 'socket.io';

export const configureApp = (core: Core, options: IApplicationOptions, socketServer: SocketIO.Server): Core => {
  return configureRoutes(
    configureMiddlewares(
      configureView(core), options.middlewares
    ), options.routes, extractModels(options.models), socketServer);
};
export const extractModels = (models: Model[] = []): IModel[] => {
  return models.map((model) => ({
    name: model.name(),
    model: model
  }));
};
//
export const configureRoutes = (core: Core, routes: IRoute[], models: IModel[], socketServer: SocketIO.Server): Core => {
  routes.forEach((route) => {
    if (!route.controller && !route.render) {
      throw new Error(`Error on: ${route.path} define render or controller on routes config.`);
    }

    console.log(`Configure route [${route.type}]: ${route.path}`);
    callRoute(core, route, models, socketServer);
  });
  return core;
};
//
export const callRoute = (core: Core, route: IRoute, models: IModel[], socketServer: SocketIO.Server) => {
  if (route.middlewares) {
    const middlewares = route.middlewares.map((m) => ({
      path: route.path,
      middleware: m.middleware
    }));
    configureMiddlewares(core, middlewares);
  }
  Core.express[route.type](route.path, (request: express.Request, response: express.Response) => {
    let io: SocketIO.Socket = undefined;
    if (route.io) {
      socketServer.on('connection', (socket) => {
        io = socket;
      });
    }
    if (typeof route.controller === 'function') {
      route.controller({ request, response, models, io });
    }
    callController(<string>route.controller, { request, response, models, io });
  });
};
//
export const callController = (controller: string, controllerOpts: ICallController): express.Response => {
  const controllerString: Array<string> = controller.split('@');
  const controllerPath: string = path.join(__dirname, '..', 'controllers', controllerString[0] || controller);
  const controllerClass = require(controllerPath).default;
  if (controllerString[1]) {
    return new controllerClass(controllerOpts)[controllerString[1]]();
  }
  return new controllerClass(controllerOpts).index();
};
//
export const configureMiddlewares = (core: Core, middlewares: IMiddleware[] = []): Core => {
  middlewares.forEach((middleware) => {
    if (middleware.path) {
      Core.express.use(middleware.path, middleware.middleware);
    }
    Core.express.use(middleware.middleware);
  });
  return core;
};

export const configureView = (core: Core): Core => {
  const hbs = expressHandlebars.create({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
    partialsDir: path.join(__dirname, '..', 'views', 'partials')
  });
  Core.express.engine('.hbs', hbs.engine);
  Core.express.set('view engine', '.hbs');
  Core.express.set('views', path.join(__dirname, '..', 'views'));
  // handlebarsIntl.registerWith(hbs.handlebars)
  return core;
};
