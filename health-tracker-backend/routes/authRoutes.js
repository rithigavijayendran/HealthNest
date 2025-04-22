import express from 'express';
import { register, login, refreshToken,getProfile,updateProfile} from '../controllers/authController.js';
import authenticate  from '../services/auth.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Refresh token route
router.post('/refresh-token', refreshToken);
router.get('/profile',authenticate, getProfile);
router.put('/me', authenticate, updateProfile);

export default router;
