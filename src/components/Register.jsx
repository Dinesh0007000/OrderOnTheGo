import React, { useContext, useState } from 'react'
import { GeneralContext } from '../context/GeneralContext';
import { toast } from 'react-toastify';

const Register = ({ setIsLogin }) => {

  const { setUsername, setEmail, setPassword, setUsertype, usertype, setRestaurantAddress, setRestaurantImage, register } = useContext(GeneralContext);


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const success = await register();
      if (success) {
        toast.success("✅ Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      if (err.message === "Missing required fields") {
        toast.warn("⚠️ Please fill all required fields.");
      } else if (err.message.includes("Restaurant address and image")) {
        toast.warn("⚠️ Restaurant details required.");
      } else {
        toast.error("❌ Registration failed. Please check your inputs.");
      }
    }
  };




  return (
    <form className="authForm">
      <h2>Register</h2>
      <div className="form-floating mb-3 authFormInputs">
        <input type="text" className="form-control" id="floatingInput" placeholder="username"
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
        onChange={(e) => setUsertype(e.target.value)}>
        <option value="">User type</option>
        <option value="restaurant">Restaurant</option>
        <option value="customer">Customer</option>
      </select>

      {usertype === 'restaurant' ?
        <>
          <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="floatingAddress" placeholder="Address"
              onChange={(e) => setRestaurantAddress(e.target.value)} />
            <label htmlFor="floatingAddress">Address</label>
          </div>
          <div className="form-floating mb-3 authFormInputs">
            <input type="text" className="form-control" id="floatingImage" placeholder="Image"
              onChange={(e) => setRestaurantImage(e.target.value)} />
            <label htmlFor="floatingImage">Thumbnail Image</label>
          </div>
        </>
        :
        ""
      }

      <button className="btn btn-primary" onClick={handleRegister}>Sign up</button>
      <p>Already registered? <span onClick={() => setIsLogin(true)}>Login</span></p>
    </form>
  )
}
export default Register;