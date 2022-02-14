import { Router } from 'express';

import toolsRouter from '../routers/tools.js';
import userRouter from '../routers/users.js';

import tokenAuthorizationMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use('/users', userRouter);
router.use('/tools', tokenAuthorizationMiddleware, toolsRouter);

export default router;
