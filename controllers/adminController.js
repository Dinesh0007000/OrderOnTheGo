import { User, Restaurant, Admin, Order } from '../schema.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to get restaurants" });
  }
};

export const promoteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await Admin.updateOne({}, { $addToSet: { promotedRestaurants: restaurantId } }, { upsert: true });
    res.json({ success: true, message: "Restaurant promoted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to promote restaurant" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};

export const approveRestaurant = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, { approval: true }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User approved successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error approving user' });
  }
};

export const displayPendingApprovals =async (req, res) => {
  try {
    const pendingApprovals= await User.find({ userType: 'restaurantOwner', approval: false });
    res.json({ success: true, data: pendingApprovals });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching pending approvals' });
  }
}