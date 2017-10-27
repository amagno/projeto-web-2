import * as express from 'express';
import * as http from 'http';
import IRoute from '../interfaces/IRoute';
import { extractModels, configureApp } from './Helpers';
import IApplicationOptions from '../interfaces/IApplicationOptions';
import IModel from '../interfaces/IModel';
import Model from '../models/Model';
import * as mongoose from 'mongoose';
import * as SocketIO from 'socket.io';
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
  protected socketServer: SocketIO.Server;
  /**
   * Creates an instance of Core.
   * @memberof Core
   */
  constructor(options: IApplicationOptions) {
    this.server = http.createServer(Core.express);
    this.socketServer = SocketIO.listen(this.server);
    this.app = configureApp(this, options, this.socketServer);
    // console.log(this.getModel('user'));
  }
  /**
   * @param {number} [port]
   * @param {string} [address]
   * @memberof Core
   */
  public listen(port: number = 3000, address: string = '127.0.0.1') {
    this.server.listen(port, address, () => {
      this.listenLog(this.server.address().address, this.server.address().port);
    });
  }
  /**
   * @private
   * @param {string} address
   * @param {number} port
   * @memberof Core
   */
  private listenLog(address: string, port: number): void {
    console.log(`Server is running on http://${address}:${port}`);
  }
}
