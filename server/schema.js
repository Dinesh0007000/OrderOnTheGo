import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['customer', 'restaurantOwner', 'deliveryBoy','admin'], required: true },
    approval: { type: Boolean, default: false },
});

const restaurantSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    mainImg: { type: String },
    attributes: [{ type: String }],
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }]
});

const adminSchema = new mongoose.Schema({
    categories: [{ type: String }],
    banners: [{ type: String }],
    promotedRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});

const foodItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    menuType: { type: String },
    category: { type: String },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    restaurantName: { type: String },
    foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
    quantity: { type: Number, required: true },
    foodItemName: { type: String },
    foodItemImg: { type: String },
    price: { type: Number },
    discount: { type: Number, default: 0 }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    pincode: { type: String },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    restaurantName: { type: String },
    foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
    foodItemName: { type: String },
    foodItemImg: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    discount: { type: Number, default: 0 },
    paymentMethod: { type: String },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered'], default: 'Pending' }
});

const User = mongoose.model('User', userSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Admin = mongoose.model('Admin', adminSchema);
const FoodItem = mongoose.model('FoodItem', foodItemSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);

export { User, Restaurant, Admin, FoodItem, Cart, Order };