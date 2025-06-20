#  OrderOnTheGo — Food Ordering System

Welcome to **OrderOnTheGo**, a full-stack food ordering platform connecting users with restaurants and their menus. This project is developed as a team collaboration.

---

##  Project Structure

/OrderOnTheGo
│
├── server/ # Backend & DB logic
│ ├── index.js # MongoDB connection + server entry point
│ ├── schema.js # All Mongoose models (User, Product, etc.)
│
├── .env # MongoDB URI (kept secret)
├── .gitignore # Ignores .env, node_modules, etc.
├── package.json # Project dependencies
└── README.md # This documentation

##  Getting Started

###  Prerequisites

- Node.js (v18 or above)
- Git

---

##  Setup Instructions (For All Team Members)

### 1. Clone the Repository
git clone https://github.com/your-username/OrderOnTheGo.git
cd OrderOnTheGo
### 2. Install Dependencies
npm install
### 3. Create .env file in root folder:
MONGO_URI=mongodb+srv://Dinesh:orderPass123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

### MongoDB Database Setup
The MongoDB connection is handled inside /server/index.js using Mongoose.

To test the connection:

node server/index.js

You should see:

✅ MongoDB Connected Successfully!

### Database Schema Overview
All schemas are defined in /server/schema.js based on the ER diagram.

#### 1. User Schema
Schema: userSchema

Model: User

Fields:

username

email

password

#### 2. Product Schema
Schema: productSchema

Model: Product

Fields:

productName

description

price

category

restaurantId (Ref: Restaurant)

#### 3. Order Schema
Schema: orderSchema

Model: Order

Fields:

userId (Ref: User)

products (Array of productId, quantity, size)

orderDate

#### 4. Cart Schema
Schema: cartSchema

Model: Cart

Fields:

userId (Ref: User)

products (Array of productId, quantity, size)

#### 5. Admin Schema
Schema: adminSchema

Model: Admin

Fields:

categories (Array)

promotedRestaurants (Ref: Restaurant)

#### 6. Restaurant Schema
Schema: restaurantSchema

Model: Restaurant

Fields:

name

address

contact

menu (Array of Product references)

### Backend Developer Guide
Import Models in Backend Files:

const { User, Product, Order, Cart, Admin, Restaurant } = require('./schema');

🔒 Security Notes
.env file is in .gitignore — MongoDB credentials will not be pushed to GitHub.

User passwords must be hashed before saving (to be implemented in backend).
Rewrite this Readme.md fiel after completion of tasks ( As mongodb credentials are mentioned and only the database setup is shown)
