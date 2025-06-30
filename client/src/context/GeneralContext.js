// GeneralContext.js
import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../components/AxiosInstance';
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const usertype = localStorage.getItem('userType');

    if (id && username && email && usertype) {
      setUser({ id, username, email, usertype });
    }

    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const response = await axiosInstance.get('/fetch-cart');
      setCartCount(response.data.filter(item => item.userId === userId).length);
    }
  };

  const handleSearch = () => {
    navigate('#products-body');
  };

  const login = async () => {
    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    try {
      const loginInputs = { email, password };
      const res = await axiosInstance.post('/login', loginInputs);

      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      setUser({
        id: res.data._id,
        username: res.data.username,
        email: res.data.email,
        usertype: res.data.usertype
      });

      if (res.data.usertype === 'customer') navigate('/');
      else if (res.data.usertype === 'admin') navigate('/admin');
      else if (res.data.usertype === 'restaurant') navigate('/restaurant');

      return true;

    } catch (err) {
      console.log("Login failed!", err);
      throw err;
    }
  };


  const register = async () => {
    if (!username || !email || !password || !usertype) {
      throw new Error("Missing required fields");
    }

    if (usertype === 'restaurant' && (!restaurantAddress || !restaurantImage)) {
      throw new Error("Restaurant address and image are required");
    }

    const inputs = { username, email, password, usertype, restaurantAddress, restaurantImage };

    try {
      const res = await axiosInstance.post('/register', inputs);
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };



  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <GeneralContext.Provider value={{
      user,
      login,
      register,
      logout,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      usertype, setUsertype,
      restaurantAddress, setRestaurantAddress,
      restaurantImage, setRestaurantImage,
      productSearch, setProductSearch,
      handleSearch,
      cartCount,
      fetchCartCount,
      searchTerm, setSearchTerm,

    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
