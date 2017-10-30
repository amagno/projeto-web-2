import IMiddleware from '../interfaces/IMiddleware';
import * as path from 'path';

// middlewares
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as multer from 'multer';
import { scripts } from './compiler';
import { authSession, userMiddleware, authMiddleware } from '../middlewares/usersMiddleware';
import { compilerMiddleware, compilerDevMiddleware } from '../middlewares/compilerMIddleware';

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
    middleware: authSession
  },
  {
    // User middleware
    middleware: userMiddleware
  },
  {
    path: '/post',
    middleware: authMiddleware
  },
  {
    path: '/user',
    middleware: authMiddleware
  },
  {
    path: '/post',
    middleware: multer({ dest: process.env.UPLOAD_PATH || 'uploads/' }).single('image')
  },
  {
    middleware: process.env.NODE_ENV === 'dev' ? compilerDevMiddleware(scripts)  : compilerMiddleware(scripts)
  }
];

export default middlewares;