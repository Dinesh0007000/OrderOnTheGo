import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../components/AxiosInstance';
import '../../styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [promoteList, setPromoteList] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRestaurants();
    fetchOrders();
    fetchPromotions();
  }, []);

  const fetchUsers = async () => {
    await axiosInstance.get('/fetch-users').then(
      (response) => setUsers(response.data)
    );
  };

  const fetchRestaurants = async () => {
    await axiosInstance.get('/fetch-restaurants').then(
      (response) => setRestaurants(response.data)
    );
  };

  const fetchOrders = async () => {
    await axiosInstance.get('/fetch-orders').then(
      (response) => setOrdersCount(response.data.length)
    );
  };

  const approveUser = async (id) => {
    await axiosInstance.post('/approve-user', { id }).then(
      (response) => {
        alert('Restaurant approved!');
        fetchUsers();
      }
    );
  };

  const rejectUser = async (id) => {
    await axiosInstance.post('/reject-user', { id }).then(
      (response) => {
        alert('Restaurant Rejected!');
        fetchUsers();
      }
    );
  };

  const handlePromoteCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setPromoteList([...promoteList, value]);
    } else {
      setPromoteList(promoteList.filter(size => size !== value));
    }
  };

  const handlePromoteUpdate = async () => {
    await axiosInstance.post('/update-promote-list', { promoteList }).then(
      (response) => alert('Promote list updated!!')
    );
  };

  const fetchPromotions = async () => {
    await axiosInstance.get('/fetch-promoted-list').then(
      (response) => setPromoteList(response.data)
    );
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-stats-grid">
        <div className="admin-card">
          <h3 className="card-title">Total Users</h3>
          <p className="card-value">{users.length - 1}</p>
          <button
            onClick={() => navigate('/all-users')}
            className="card-button"
          >
            View All
          </button>
        </div>
        <div className="admin-card">
          <h3 className="card-title">All Restaurants</h3>
          <p className="card-value">{restaurants.length}</p>
          <button
            onClick={() => navigate('/all-restaurants')}
            className="card-button"
          >
            View All
          </button>
        </div>
        <div className="admin-card">
          <h3 className="card-title">All Orders</h3>
          <p className="card-value">{ordersCount}</p>
          <button
            onClick={() => navigate('/all-orders')}
            className="card-button"
          >
            View All
          </button>
        </div>
      </div>

      <div className="admin-content-grid">
        <div className="admin-promotions">
          <h3 className="section-title">Popular Restaurants (Promotions)</h3>
          <div className="promotions-list">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className="promotion-item">
                <input
                  type="checkbox"
                  value={restaurant._id}
                  checked={promoteList.includes(restaurant._id)}
                  onChange={handlePromoteCheckBox}
                  className="promotion-checkbox"
                />
                <label className="promotion-label">{restaurant.title}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handlePromoteUpdate}
            className="update-button"
          >
            Update Promotions
          </button>
        </div>

        <div className="admin-approvals">
          <h3 className="section-title">Pending Approvals</h3>
          <div className="approvals-list">
            {users.filter(user => user.approval === 'pending').length === 0 ? (
              <p className="no-requests">No new requests...</p>
            ) : (
              users.filter(user => user.approval === 'pending').map((user) => (
                <div
                  key={user._id}
                  className="approval-item"
                >
                  <div className="approval-info">
                    <h4 className="approval-subtitle">Restaurant</h4>
                    <p className="approval-name">{user.username}</p>
                  </div>
                  <div className="approval-actions">
                    <button
                      onClick={() => approveUser(user._id)}
                      className="approve-button"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectUser(user._id)}
                      className="reject-button"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
