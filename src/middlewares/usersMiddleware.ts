import * as express from 'express';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
import Mongo from '../data/Mongo';


const MongoStore = connectMongo(session);
const mongoConnection = Mongo.init(process.env.MONGO_URL, process.env.NODE_ENV === 'dev');

export const userMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
};
export const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session.user || !req.session.user.id) {
    return res.render('login', {
      errors: {
        auth: 'Não autorizado!'
      }
    });
  }
  return next();
};
export const authSession = session({
  secret: process.env.SESSION_KEY,
  store: new MongoStore({
    mongooseConnection: mongoConnection
  }),
  resave: false,
  saveUninitialized: true
});