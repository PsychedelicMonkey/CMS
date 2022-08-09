import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from './config/logger';

import indexRouter from './routes';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

const createApplication = () => {
  const app: Application = express();

  app.disable('x-powered-by');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser());
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      logger.error(err.message);
    }

    return res.status(500).json({ msg: 'server error' });
  });

  return app;
};

export default createApplication;
