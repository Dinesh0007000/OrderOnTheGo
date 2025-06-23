
import express from "express";
import { 
    addToCart,
    removeFromCart,
    getCart,
    clearUserCart,
    updateCartQuantity
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.delete('/remove/:cartItemId',authMiddleware,removeFromCart);
cartRouter.get('/:userId',authMiddleware,getCart);
cartRouter.put('/update',authMiddleware,updateCartQuantity)
cartRouter.delete('/clear',authMiddleware,clearUserCart)
export default cartRouter;



