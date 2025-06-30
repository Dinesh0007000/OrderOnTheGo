import React, { useEffect, useState } from 'react'
import '../../styles/RestaurantHome.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../components/AxiosInstance';
import { FaBoxOpen, FaClipboardList, FaPlusCircle } from 'react-icons/fa';

const RestaurantHome = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [restaurant, setRestaurant] = useState('pending');

  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    await axiosInstance.get(`/fetch-user-details/${userId}`).then(
      (response) => {
        setRestaurant(response.data);
        console.log(response.data._id);
      }
    )
  }

  const [ItemsCount, setItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [restaurantData, setRestaurantData] = useState();

  useEffect(() => {
    fetchRestaurantData();
  }, [])



  const fetchRestaurantData = async () => {
    await axiosInstance.get(`/fetch-restaurant-details/${userId}`).then(
      (response) => {
        setRestaurantData(response.data);
        console.log(response.data)
      }
    )
  }

  useEffect(() => {
    if (restaurantData) {
      fetchItems();
      fetchOrders();
    }
  }, [restaurantData])

  const fetchItems = async () => {
    await axiosInstance.get('/fetch-items').then(
      (response) => {
        setItemsCount(response.data.filter(item => item.restaurantId === restaurantData._id).length);

      }
    )
  }

  const fetchOrders = async () => {
    await axiosInstance.get('/fetch-orders').then(
      (response) => {
        setOrdersCount(response.data.filter(item => item.restaurantId === restaurantData._id).length);
      }
    )
  }

  return (
    <div className="restaurantHome-page">
      {restaurant.approval === 'pending' ? (
        <div className="restaurant-approval-required">
          <h3>Approval Required!!</h3>
          <p>
            You need to get approval from the admin to make this work. Please be patient!
          </p>
        </div>
      ) : (
        <>
          <div className="restaurant-banner">
            <div className="banner-text">
              <h2>Welcome Back, {restaurant?.name || "Restaurant Owner"} 👋</h2>
              <p>Here's a quick overview of your restaurant dashboard.</p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
              alt="Avatar"
              className="banner-avatar"
            />
          </div>

          <div className="restaurantHome-grid">
            <div className="admin-home-card fade-in">
              <div className="card-icon"><FaBoxOpen /></div>
              <h5>All Items</h5>
              <p>{ItemsCount}</p>
              <button onClick={() => navigate('/restaurant-menu')}>View All</button>
            </div>

            <div className="admin-home-card fade-in">
              <div className="card-icon"><FaClipboardList /></div>
              <h5>All Orders</h5>
              <p>{ordersCount}</p>
              <button onClick={() => navigate('/restaurant-orders')}>View All</button>
            </div>

            <div className="admin-home-card fade-in">
              <div className="card-icon"><FaPlusCircle /></div>
              <h5>Add Item</h5>
              <p>(new)</p>
              <button onClick={() => navigate('/new-product')}>Add Now</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantHome
