import express from 'express';
import { login, logout, register } from '../controllers/auth.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', express.urlencoded({ extended: false }), login);
router.post('/logout', logout);

export default router;
