import { Router } from 'express';
import * as indexController from '../controllers/index.controller.js';

const router = Router();

router.get('/', indexController.getMain);

export default router;
