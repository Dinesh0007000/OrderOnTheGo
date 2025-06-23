import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import checkRoles from '../middleware/checkRoles.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authenticated user
router.get('/profile', authMiddleware, getUserProfile);

// Admin routes
router.get('/all', authMiddleware, checkRoles(['admin']), getAllUsers);
router.delete('/:id', authMiddleware, checkRoles(['admin']), deleteUser);

export default router;
