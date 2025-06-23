import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getAllRestaurants,
  promoteRestaurant,
  getAllOrders,
  updateOrderStatus,
  approveRestaurant,
  displayPendingApprovals
} from '../controllers/adminController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import checkRoles from '../middleware/checkRoles.js';

import { User } from '../schema.js'

const router = express.Router();

// Protect all admin routes
router.use(authMiddleware, checkRoles(['admin']));

// Admin actions
router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/restaurants', getAllRestaurants);
router.post('/promote-restaurant', promoteRestaurant);
router.get('/orders', getAllOrders);
router.put('/order/:id/status', updateOrderStatus);


router.put('/approve/:id', authMiddleware, checkRoles(['admin']), approveRestaurant);

router.get('/pending-owners', authMiddleware, checkRoles(['admin']), displayPendingApprovals);



export default router;
