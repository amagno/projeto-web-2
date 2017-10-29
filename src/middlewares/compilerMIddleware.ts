import * as express from 'express';
// import { compilerClient } from '../utils/compilerClient';

export const compilerMiddleware = (scripts: string[]) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.scripts = {};
  scripts.forEach((script) => {
    res.locals.scripts[script] = `<script src="/public/__compiled__/${script}.js"></script>`;
  });
  next();
};
// export const compilerDevMiddleware = (scripts: string[]) => {
//   compilerClient(scripts);
//   return compilerMiddleware(scripts);
// };