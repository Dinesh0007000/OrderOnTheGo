import { Order, FoodItem } from '../schema.js';

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name, email, mobile, address, pincode,
      foodItemId, quantity, paymentMethod
    } = req.body;

    const food = await FoodItem.find({foodItemId});
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    const order = new Order({
      userId,
      name,
      email,
      mobile,
      address,
      pincode,
      restaurantId: food.restaurantId,
      restaurantName: food.title, // You can update to actual restaurant name if needed
      foodItemId,
      foodItemName: food.title,
      foodItemImg: food.image,
      quantity,
      price: food.price,
      discount: food.discount,
      paymentMethod,
    });

    await order.save();
    res.json({ success: true, message: "Order placed successfully", order });

  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.find({ userId }).sort({ orderDate: -1 });
      res.json({ success: true, orders });
    } catch (error) {
      console.error("Get user orders error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({ orderDate: -1 });
      res.json({ success: true, orders });
    } catch (error) {
      console.error("Get all orders error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const validStatuses = ['Pending', 'Confirmed', 'Delivered'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
  
      const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
  
      res.json({ success: true, message: "Order status updated", order: updated });
    } catch (error) {
      console.error("Update order status error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export {
    placeOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
  };
        