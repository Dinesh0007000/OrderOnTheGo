# OrderOnTheGo 🍔🚴‍♂️

OrderOnTheGo is a full-stack food ordering platform where customers can browse restaurants, add items to their cart, place orders, and track them. Restaurant owners can list food items after approval by an admin. Admins can manage users, restaurants, and promotional content.

---

## 🔧 Tech Stack

- **Frontend:** React.js (if implemented)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **API Testing:** Hoppscotch or Postman

---

## 📁 Folder Structure

server/
├── controllers/
│ ├── userController.js
│ ├── restaurantController.js
│ ├── foodController.js
│ ├── cartController.js
│ └── orderController.js
├── routes/
│ ├── userRoutes.js
│ ├── restaurantRoutes.js
│ ├── foodRoutes.js
│ ├── cartRoutes.js
│ └── orderRoutes.js
├── middleware/
│ ├── authMiddleware.js
│ └── roleMiddleware.js
├── schema.js
├── .env (excluded via .gitignore)
├── .gitignore
├── package.json
└── server.js

yaml
Copy
Edit

---

## 🚀 Features

### 👤 User Flow
- Register and login
- Browse restaurants and food items
- Add items to cart and place orders
- View order history

### 🍽️ Restaurant Flow
- Register as a restaurant owner
- Await admin approval
- Add/edit food items once approved

### 🛠️ Admin Flow
- Login as admin
- Approve restaurant owners
- Manage users, food categories, banners, and promoted restaurants

---

## 📦 Installation & Setup

### 1. Clone the Repo
git clone https://github.com/Dinesh0007000/OrderOnTheGo.git
cd OrderOnTheGo/server
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create .env File
env
Copy
Edit
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=yourVerySecretKey123
PORT=5000
4. Start Server
bash
Copy
Edit
npm start
# or use
nodemon server.js
🧪 API Testing with Hoppscotch
Register User → POST /api/user/register

Login User → POST /api/user/login

Create Restaurant (Owner) → POST /api/restaurant/create (after approval)

Add Food Item → POST /api/food/add

Add to Cart → POST /api/cart/add

Place Order → POST /api/order/create

Admin Approval → PATCH /api/admin/approve/:userId

⚠️ Important
Don’t commit .env or node_modules to GitHub.

.gitignore should include:
node_modules/
.env
