import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middleware/auth';
import User from '../models/User';

const router: Router = Router();

router.get(
  '/',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }
);

router.get(
  '/:id',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.post(
  '/',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({ name, email, password });

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
