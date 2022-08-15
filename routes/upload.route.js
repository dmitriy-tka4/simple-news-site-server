import { Router } from 'express';
import * as uploadController from '../controllers/upload.controller.js';

const router = Router();

router.post('/', uploadController.uploadFile);

export default router;
