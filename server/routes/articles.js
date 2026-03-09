import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getCategories
} from '../controllers/articleController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/', getAllArticles);
router.get('/:id', authenticate, getArticleById);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
