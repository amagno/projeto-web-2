import * as express from 'express';
import * as http from 'http';
import IRoute from '../interfaces/IRoute';
import { extractModels, configureApp } from './Helpers';
import IApplicationOptions from '../interfaces/IApplicationOptions';
import IModel from '../interfaces/IModel';
import Model from '../models/Model';
import * as mongoose from 'mongoose';
/**
 * @abstract
 * @class Kernel
 */
export default abstract class Core  {
  static express: express.Application = express();
  // protected app: express.Application;
  /**
   * @protected
   * @type {http.Server}
   * @memberof Kernel
   */
  protected server: http.Server;
  protected routes: IRoute[];
  protected app: Core;
  /**
   * Creates an instance of Core.
   * @memberof Core
   */
  constructor(options: IApplicationOptions) {
    this.server = http.createServer(Core.express);
    this.app = configureApp(this, options);
    // console.log(this.getModel('user'));
  }
  /**
   * @param {number} [port]
   * @param {string} [address]
   * @memberof Core
   */
  public listen(port: number, address?: string) {
    this.server.listen(port || 5000, address, () => {
      this.listenLog(process.env.NODE_ENV, this.server.address().address, this.server.address().port);
    });
  }
  /**
   * @private
   * @param {string} address
   * @param {number} port
   * @memberof Core
   */
  private listenLog(env: string, address: string, port: number): void {
    console.log(`Server: [${env}] is running on http://${address}:${port}`);
  }
}
