import * as webpack from 'webpack';
import * as fs from 'fs';
import config from '../../webpack.config';
import * as express from 'express';

let compiled = false;

const dir = fs.existsSync(config.output.path);

// if (dir) {
//   console.log(`Removing directory: ${config.output.path}`);
//   fs.rmdirSync(config.output.path);
// }

const compiler = new Promise((resolve, reject) => {
  webpack(config).run((error, data) => {
    if (error) {
      return reject(error.message);
    }
    if (data.hasErrors()) {
      return reject(data.toString());
    }
    return resolve(data);
  });
});

export const compilerDevMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!compiled) {
    console.log('Compiler webpack middleware, compiling....');
    compiler
    .then(data => console.log(data))
    .catch(error => console.log(error));
    compiled = true;
  }
  next();
};

compiler.catch(error => console.log(error));