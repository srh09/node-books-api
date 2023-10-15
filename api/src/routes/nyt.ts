import express from 'express';
import { getBooksByListName, getListNames } from '../controllers/nyt.js';

const router = express.Router();
router.get('/books/:listName', getBooksByListName);
router.get('/list-names', getListNames);

export default router;
