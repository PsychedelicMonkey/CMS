import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('authorization token required');
    }

    const { id } = (await verify(
      token,
      process.env.JWT_SECRET || ''
    )) as JwtPayload;

    const user = await User.findById(id);
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'authentication failure' });
  }
};

export default auth;
