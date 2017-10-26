import IMiddleware from '../interfaces/IMiddleware';
import Mongo from '../data/Mongo';
import * as path from 'path';
import * as dotenv from 'dotenv';

// middlewares
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';

dotenv.config();

const MongoStore = connectMongo(session);
const mongoConnection = Mongo.init(process.env.MONGO_URL, process.env.NODE_ENV === 'dev');

const middlewares: IMiddleware[] = [
  {
    middleware: bodyParser.json()
  },
  {
    middleware: bodyParser.urlencoded({ extended: false })
  },
  {
    path: '/public',
    middleware: express.static(path.join(__dirname, '..', '..', '/public'))
  },
  {
    middleware: session({
      secret: process.env.SESSION_KEY,
      store: new MongoStore({
        mongooseConnection: mongoConnection
      }),
      resave: false,
      saveUninitialized: true
    })
  }
];

export default middlewares;