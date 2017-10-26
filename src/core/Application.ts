import * as express from 'express';
import Core from './Core';
import IApplicationOptions from '../interfaces/IApplicationOptions';

export default class Application extends Core {

  /**
   * @static
   * @param {number} [port]
   * @param {string} [address]
   * @param {*} [config]
   * @returns {Application}
   * @memberof Application
   */
  public static start(options: IApplicationOptions, port?: number, address?: string): Application {
    const app = new Application(options);
    app.listen(port, address);
    return app;
  }
}