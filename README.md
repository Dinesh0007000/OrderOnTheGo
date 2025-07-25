# 🍽️ OrderOnTheGo – Full Stack Food Ordering App

A MERN-based food ordering web app with dedicated roles for users, restaurant owners, and admins. Features secure authentication, admin approvals, restaurant promotions, and a responsive UI.

🎥 Watch the video walkthrough [here](https://drive.google.com/file/d/1WGywnqZHLDB0yGEhwzM_hzADJm0gt0AI/view?usp=drive_link).

---

## 🔗 Live Demo

- **Frontend**: [https://orderonthego-client-hzj0.onrender.com]([https://orderonthego-client-hzj0.onrender.com)](https://orderonthego-client-pcbh.onrender.com)
- **Backend**: [https://your-backend-url.onrender.com](https://orderonthego.onrender.com/)) 

---

## 🧰 Tech Stack
```
| Layer       | Tools / Libraries                            |
|-------------|-----------------------------------------------|
| Frontend    | React.js, React Router, Bootstrap             |
| Backend     | Express.js, Node.js                           |
| Database    | MongoDB (via Mongoose)                        |
| Auth        | Bcrypt.js                                     |
| State/API   | Axios (centralized AxiosInstance)             |
| UI Features | React Slick, React Toastify                   |
| Deployment  | Render (both frontend and backend)            |
```
---

## 📦 Project Overview

- 🔑 **Secure authentication** with bcrypt and role-based control (User, Restaurant, Admin).
- 🏪 **Admin dashboard** to approve/reject restaurant applications and promote restaurants.
- 🛒 **Users** can browse restaurants, add items to cart, and place orders.
- 📦 **Restaurant owners** can manage menu items and monitor orders.
- 🖼️ **Promoted Restaurants carousel** powered by React Slick.
- 🌐 Fully deployed frontend and backend with proper routing and CORS.

---

## ⚙️ Axios Base URL

📁 `client/src/components/AxiosInstance.js`

```js
const axiosInstance = axios.create({
  baseURL: 'https://your-backend-url.onrender.com', // update to actual Render backend link
});
export default axiosInstance;
Located in:
📄 client/src/components/AxiosInstance.js

👉 For local testing:
const axiosInstance = axios.create({
  baseURL: 'http://localhost:6001',
});
```
🛠️ Run Locally (Optional)
```
Only needed if you want to test it locally.

1. Clone the Repo
git clone https://github.com/Dinesh0007000/OrderOnTheGo
cd OrderOnTheGo

2. Backend Setup
cd server
npm install
npm run dev

3. Frontend Setup
cd ../client
npm install
npm start
```

🧪 Test Admin Access (If Needed)
```
Email: admin@example.com
Password: admin123
Admin panel includes restaurant approvals, order views, promotions, etc.
```
