import express from 'express';
import {
  getReviewsByIsbn,
  createReview,
  updateReviewById,
  deleteReviewById,
} from '../controllers/review.js';

const router = express.Router();
router.get('/:isbn', getReviewsByIsbn);
router.post('/', createReview);
router.put('/:id', updateReviewById);
router.delete('/:id', deleteReviewById);

export default router;
