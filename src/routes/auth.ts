import { NextFunction, Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';

import auth from '../middleware/auth';
import User from '../models/User';

const router: Router = Router();
const JWT_SECRET: string = process.env.JWT_SECRET || '';

router.post(
  '/login',
  check('email').isEmail().withMessage('please enter a valid email address'),
  check('password').notEmpty().withMessage('please enter your password'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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
  check('name').notEmpty().withMessage('please enter your name'),
  check('email').isEmail().withMessage('please enter a valid email address'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 characters long'),
  check('email').custom((email) => {
    return User.findOne({ email }).then(() => {
      return Promise.reject('that email address is already registered');
    });
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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

router.get('/me', auth, (req: Request, res: Response, next: NextFunction) => {
  return res.json(req.user);
});

export default router;
