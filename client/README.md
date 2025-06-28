🍽️ SB Foods – React App
This is a full-featured food ordering web application built with React.js. It supports multiple user types like Customers, Admins, and Restaurants, with dynamic restaurant listings, search functionality, and role-based routing.


✅ Prerequisites
Node.js installed

MongoDB running (if you're using the backend)

Backend server running at http://localhost:6001

📦 Available Scripts
In the project directory, run:

npm install
Installs all the required dependencies.

npm start
Runs the frontend app in development mode.
Open http://localhost:3000 in your browser.

You’ll see live reloads on changes, and any lint errors will appear in the console.

👤 User Roles
Customer: Can browse restaurants, add items to cart, and place orders.

Admin: Can view users, orders, and manage restaurants.

Restaurant: Can manage its own menu and handle orders.

🔍 Search Feature
The Navbar has a search bar that filters restaurants by name in the Home Page under the All Restaurants section.

Typing a name (like "burger") and clicking the search icon or pressing Enter filters the visible restaurants.

🍱 Categories
Clicking a category like "Biryani", "Pizza", etc., will show a toast message guiding the user to view items under that cuisine in the restaurants section.

🛠️ Project Structure
src/
├── components/         // Reusable UI components
├── context/            // GeneralContext for app-wide state
├── pages/              // Main pages like Home, Profile, Admin
├── styles/             // All CSS files
├── App.js              // Main app routing
└── index.js            // React entry point

👩‍💻 Developer Notes

Admin Registration via cURL

curl -X POST http://localhost:6001/register \
-H "Content-Type: application/json" \
-d '{
  "username": "adminuser",
  "email": "admin@example.com",
  "password": "admin123",
  "usertype": "admin"
}'

📚 Learn More
React Docs

React Router

Toastify

Create React App Docs

