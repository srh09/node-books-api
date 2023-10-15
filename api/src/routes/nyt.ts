import express from 'express';
import { getBooksByListName, getCategoryNames } from '../controllers/nyt.js';

const router = express.Router();
router.get('/books/:listName', getBooksByListName);
router.get('/list-names', getCategoryNames);

export default router;
