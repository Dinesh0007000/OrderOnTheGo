import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import checkRoles from '../middleware/checkRoles.js';

const router = express.Router();

// Customers
router.post('/place', authMiddleware, checkRoles(['customer']), placeOrder);
router.get('/my-orders', authMiddleware, checkRoles(['customer']), getUserOrders);

// Admin
router.get('/all', authMiddleware, checkRoles(['admin']), getAllOrders);
router.put('/update-status/:id', authMiddleware, checkRoles(['admin', 'deliveryBoy']), updateOrderStatus);

export default router;
