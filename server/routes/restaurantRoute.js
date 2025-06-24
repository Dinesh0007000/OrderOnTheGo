// routes/restaurantRoute.js
import express from 'express';
import { createRestaurant } from '../controllers/restaurantController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoles from '../middleware/checkRoles.js';
import checkApproval from '../middleware/checkApproval.js';

const restaurantRouter = express.Router();

// Only restaurant owners can create restaurants
restaurantRouter.post(
    '/create',
    authMiddleware,
    checkRoles(['restaurantOwner']),
    checkApproval,
    createRestaurant
  );

export default restaurantRouter;
