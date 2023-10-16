import express from 'express';
import authRoutes from './auth.js';
import nytRoutes from './nyt.js';
import reviewsRoutes from './review.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/nyt', nytRoutes);
router.use('/reviews', reviewsRoutes);

export default router;
