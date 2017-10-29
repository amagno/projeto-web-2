import config from '../../webpack.config';
import * as webpack from 'webpack';

// Flag
let compiled = false;


const compiler = (_config: webpack.Configuration) => {
  return new Promise((resolve, reject) => {
    webpack(_config).run((error, data) => {
      if (error) {
        return reject(error.message);
      }
      if (data.hasErrors()) {
        return reject(data.toString());
      }
      return resolve(data);
    });
  });
};
const getConfigWithEntrys = (scripts: string[], config: webpack.Configuration): webpack.Configuration => {
  config.entry = {};
  scripts.forEach((script) => {
    config.entry = {
      ...<object>config.entry,
      [script]: `./src/__client__/${script}.ts`
    };
  });
  return config;
};
export const compilerClient = (scripts: string[]): void => {
  if (!compiled) {
    compiler(getConfigWithEntrys(scripts, config))
    .then((stats) => console.log(stats.toString()))
    .catch((error) => console.log(error.message));
    compiled = true;
  }
};
