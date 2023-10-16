import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from '../controllers/review.js';

const router = express.Router();
router.get('/', getAllReviews);
router.post('/', createReview);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

export default router;
