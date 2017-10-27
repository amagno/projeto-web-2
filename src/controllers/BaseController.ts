import { Request, Response } from 'express';
import ICallController from '../interfaces/ICallController';
import * as mongoose from 'mongoose';
import IModel from '../interfaces/IModel';
import Model from '../models/Model';


export default abstract class BaseController {
  public request: Request;
  public response: Response;
  public models: IModel[];
  public io: SocketIO.Socket;
  constructor(opts: ICallController) {
    this.request = opts.request;
    this.response = opts.response;
    this.models = opts.models;
    this.io = opts.io;
  }
  public model(name: string): Model {
    let m: IModel;
    this.models.forEach((model) => {
      if (model.name === name) {
        m = model;
      }
    });
    if (!m) {
      throw new Error(`Model: ${name} not defined on models`);
    }
    return m.model;
  }
}