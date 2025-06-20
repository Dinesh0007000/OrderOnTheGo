const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    productName: String,
    description: String,
    price: Number,
    category: String,
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        size: String
    }],
    orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        size: String
    }]
});
const Cart = mongoose.model('Cart', cartSchema);

const adminSchema = new mongoose.Schema({
    categories: [String],
    promotedRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});
const Admin = mongoose.model('Admin', adminSchema);

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { User, Product, Order, Cart, Admin, Restaurant };
