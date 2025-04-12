import express from 'express';
import { checkAuth, login, logout, singup, updateProfile } from '../controllers/auth.controller.js';
import { profileAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', singup)
router.post('/login', login)
router.post('/logout', logout)

router.put('/update-profile',profileAuth,updateProfile)

router.get("/check",profileAuth,checkAuth);

export default router;
