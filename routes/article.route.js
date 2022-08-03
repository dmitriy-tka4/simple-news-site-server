import { Router } from 'express';
import * as articleController from '../controllers/article.controller.js';

const router = Router();

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getById);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);
router.patch('/:id', articleController.patchArticle);

export default router;
