import express from 'express';
import {
  getAllFoodItems,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFilteredFoodItems
} from '../controllers/foodController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import checkRoles from '../middleware/checkRoles.js';

const router = express.Router();

router.get('/', getAllFoodItems);
router.get('/:id', getFoodItemById);

//  Allow both 'admin' and 'restaurantOwner' to create/update/delete
router.post('/add', authMiddleware, checkRoles(['admin', 'restaurantOwner']), createFoodItem);
router.put('/update/:id', authMiddleware, checkRoles(['admin', 'restaurantOwner']), updateFoodItem);
router.delete('/delete/:id', authMiddleware, checkRoles(['admin', 'restaurantOwner']), deleteFoodItem);
router.get('/',getFilteredFoodItems);

export default router;
