import { NextFunction, Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ msg: 'Hello' });
});

export default router;
