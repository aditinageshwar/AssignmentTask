import express from 'express';
import {
  getBookmarks,
  toggleBookmark,
  deleteBookmark,
  checkBookmark
} from '../controllers/bookmarkController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getBookmarks);
router.post('/toggle', toggleBookmark);
router.delete('/:articleId', deleteBookmark);
router.get('/check/:articleId', checkBookmark);

export default router;
