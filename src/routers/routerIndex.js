import { Router } from 'express';

import toolsRouter from '../routers/tools.js';
import userRouter from '../routers/users.js';

import tokenAuthorizationMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use('/users', userRouter);
router.use('/tools', tokenAuthorizationMiddleware, toolsRouter);

router.get('/check-status', (req, res) => {
    res.send('OK!');
});

router.all('/*', (req, res) => {
    res.sendStatus(501);
});

export default router;
