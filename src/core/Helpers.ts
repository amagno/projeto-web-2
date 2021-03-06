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

export const configureApp = (core: Core, options: IApplicationOptions): Core => {
  return configureRoutes(
    configureMiddlewares(
      configureView(core), options.middlewares
    ), options.routes, extractModels(options.models));
};
export const extractModels = (models: Model[] = []): IModel[] => {
  return models.map((model) => ({
    name: model.name(),
    model: model
  }));
};
//
export const configureRoutes = (core: Core, routes: IRoute[], models: IModel[]): Core => {
  routes.forEach((route) => {
    if (!route.controller && !route.render) {
      throw new Error(`Error on: ${route.path} define render or controller on routes config.`);
    }

    console.log(`Configure route [${route.type}]: ${route.path}`);
    callRoute(core, route, models);
  });
  return core;
};
//
export const callRoute = (core: Core, route: IRoute, models: IModel[]) => {
  if (route.middlewares) {
    const middlewares = route.middlewares.map((m) => ({
      path: route.path,
      middleware: m.middleware
    }));
    configureMiddlewares(core, middlewares);
  }
  Core.express[route.type](route.path, async (request: express.Request, response: express.Response) => {
    // If conytoller is function
    if (typeof route.controller === 'function') {
      return route.controller({ request, response, models });
    }
    // Call controoler if string
    return callController(<string>route.controller, { request, response, models });
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
      return Core.express.use(middleware.path, middleware.middleware);
    }
    return Core.express.use(middleware.middleware);
  });
  return core;
};
// Configure handlebars view
export const configureView = (core: Core): Core => {
  const hbs = expressHandlebars.create({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
    partialsDir: path.join(__dirname, '..', 'views', 'partials'),
  });
  Core.express.engine('.hbs', hbs.engine);
  Core.express.set('view engine', '.hbs');
  Core.express.set('views', path.join(__dirname, '..', 'views'));
  // handlebarsIntl.registerWith(hbs.handlebars)
  return core;
};
