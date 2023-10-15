import express from 'express';
import usersRoutes from './users.js';
import nytRoutes from './nyt.js';

const router = express.Router();
router.use('/users', usersRoutes);
router.use('/nyt', nytRoutes);

export default router;
