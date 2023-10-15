import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from '../controllers/review.js';

const router = express.Router();
router.post('/', createReview);
router.get('/', getAllReviews);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);
router.get('/reviews/:id', getReviewById);

export default router;
