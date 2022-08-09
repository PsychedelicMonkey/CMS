import { NextFunction, Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

const router: Router = Router();
const JWT_SECRET: string = process.env.JWT_SECRET || '';

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password').exec();

      if (!user) {
        return res.status(401).json({ msg: 'incorrect credentials' });
      }

      const success = await user.checkPassword(password);

      if (!success) {
        return res.status(401).json({ msg: 'incorrect credentials' });
      }

      const token = await sign({ id: user.id }, JWT_SECRET || '', {
        expiresIn: 3600,
      });

      return res.cookie('token', token).json({ token, user });
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({ name, email, password });

      const token = await sign({ id: user.id }, JWT_SECRET || '', {
        expiresIn: 3600,
      });

      return res.status(201).cookie('token', token).json({ token, user });
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
