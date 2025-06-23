
import {Cart, FoodItem, Restaurant} from '../schema.js';
const addToCart=async(req,res)=>{
    try {
        const userId = req.user.id;
        const {foodItemId,quantity}= req.body;
        //validate inputs
        if(!userId || !foodItemId|| !quantity || quantity<=0){
             return res.status(400).json({success:false,message:"Invalid inputs"});

        }
          // Check if food item exists
        const foodItem = await FoodItem.findById(foodItemId).populate('restaurantId');
        if (!foodItem) {
        return res.status(404).json({ success: false, message: "Food item not found" });
        }

        const restaurant = foodItem.restaurantId;
        //check if food item already exists in cart
        const existingCartItem = await Cart.findOne({userId,foodItemId});
        //increment if it does 
        if(existingCartItem){
            existingCartItem.quantity+=quantity;
            await existingCartItem.save();
            return res.json({success:true,message:"Cart Updated",cartItem:existingCartItem});
        }
         //new item getting added to cart
         const cartItem = new Cart({
            userId,
            restaurantId:restaurant._id,
            restaurantName : restaurant.title,
            foodItemId,
            quantity,
            foodItemName: foodItem.title,
            foodItemImg : foodItem.image,
            price: foodItem.price,
            discount : foodItem.discount || 0
         })
         await cartItem.save();
        res.json({success:true,message:"Item added to cart",cartItem});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
const removeFromCart = async (req, res) => {
    try {
      const { cartItemId } = req.params;
  
      const deletedItem = await Cart.findByIdAndDelete(cartItemId);
      if (!deletedItem) {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
      }
  
      res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
      console.error("Remove From Cart Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

//get all usercart
const getCart = async (req, res) => {
    try {
      const userId = req.user.id;  
      const cartItems = await Cart.find({ userId });
      res.json({ success: true, cartItems });
    } catch (error) {
      console.error("Get Cart Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
const clearUserCart = async (req, res) => {
    try {
      const { userId } = req.user.id;
  
      await Cart.deleteMany({ userId });
  
      res.json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
      console.error("Clear Cart Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  const updateCartQuantity = async (req, res) => {
    try {
      const { cartItemId, quantity } = req.body;
  
      if (quantity <= 0) {
        return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
      }
  
      const updatedItem = await Cart.findByIdAndUpdate(
        cartItemId,
        { $set: { quantity } },
        { new: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ success: false, message: "Cart item not found" });
      }
  
      res.json({ success: true, message: "Quantity updated", cartItem: updatedItem });
  
    } catch (error) {
      console.error("Update Quantity Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  

export {addToCart, removeFromCart, getCart,updateCartQuantity,clearUserCart};