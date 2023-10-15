import express from 'express';
import { getBooksByCategoryName, getCategoryNames } from '../controllers/nyt.js';

const router = express.Router();
router.get('/books/:categoryName', getBooksByCategoryName);
router.get('/category-names', getCategoryNames);

export default router;
