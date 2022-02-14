import { Router } from 'express';

import * as toolsController from '../controllers/toolsController.js';

const router = Router();

router.post('/', toolsController.postNewTool);
router.get('/', toolsController.getToolsList);
router.delete('/:id', toolsController.removeToolById);

export default router;
