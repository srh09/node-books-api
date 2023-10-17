import express from 'express';
import authRoutes from './auth.js';
import nytRoutes from './nyt.js';
import reviewsRoutes from './review.js';
import ratingsRoutes from './rating.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/nyt', nytRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/ratings', ratingsRoutes);

export default router;
