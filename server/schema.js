const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const adminSchema = new mongoose.Schema({
    categories: [String],
    promotedRestaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});
const Admin = mongoose.model('Admin', adminSchema);

const itemSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    price: Number,
    category: String,
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});
const Item = mongoose.model('Item', itemSchema);

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: Number,
            size: String
        }
    ]
});
const Cart = mongoose.model('Cart', cartSchema);

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },  
            quantity: Number,
            size: String
        }
    ],
    orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    User,
    Restaurant,
    Admin,
    Item,   
    Cart,
    Order
};
