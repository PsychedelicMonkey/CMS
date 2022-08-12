import { NextFunction, Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
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
  check('name').notEmpty().withMessage('please enter your name'),
  check('email').isEmail().withMessage('please enter a valid email address'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 characters long'),
  check('email').custom((email) => {
    return User.findOne({ email }).then((user) => {
      if (user) {
        return Promise.reject('that email address is already registered');
      }
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

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

router.put(
  '/:id',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      let user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      user = await User.findByIdAndUpdate(id, { name, email }, { new: true });

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

export default router;
