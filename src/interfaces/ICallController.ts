import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import IModel from './IModel';
import * as SocketIO from 'socket.io';

export default interface ICallController {
  request: Request;
  response: Response;
  models?: IModel[];
  io: SocketIO.Socket;
}
