import express from 'express';
import {
  getRatingByISBNAndUserID,
  upsertRating,
  deleteRatingByISBNAndUserID,
} from '../controllers/ratings.js';

const router = express.Router();
router.get('/', getRatingByISBNAndUserID);
router.post('/', upsertRating);
router.delete('/', deleteRatingByISBNAndUserID);

export default router;
