import React, { useContext, useEffect, useState } from 'react';
import '../../styles/Cart.css';
import axiosInstance from '../../components/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { fetchCartCount } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    await axiosInstance.get('http://localhost:6001/fetch-cart').then((response) => {
      const userCart = response.data.filter((item) => item.userId === userId);
      setCart(userCart);
      calculateTotal(userCart);
    });
  };

  const calculateTotal = (cartData) => {
    const price = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = cartData.reduce(
      (sum, item) => sum + ((item.price * item.discount) / 100) * item.quantity,
      0
    );
    setTotalPrice(price);
    setTotalDiscount(Math.floor(discount));
    setDeliveryCharges(price > 1000 || cartData.length === 0 ? 0 : 50);
  };

  const removeItem = async (id) => {
    await axiosInstance.put('/remove-item', { id }).then(() => {
      fetchCart();
      fetchCartCount();
    });
  };

  const placeOrder = async () => {
    if (cart.length > 0) {
      await axiosInstance
        .post('/place-cart-order', {
          userId,
          name,
          mobile,
          email,
          address,
          pincode,
          paymentMethod,
          orderDate: new Date()
        })
        .then(() => {
          alert('Order placed!');
          setName('');
          setMobile('');
          setEmail('');
          setAddress('');
          setPincode('');
          setPaymentMethod('');
          navigate('/profile');
        });
    }
  };

  return (
    <div className="cartPage">
      <div className="cartContents">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty 🛒</p>
        ) : (
          cart.map((item) => (
            <div className="cartItem" key={item._id}>
              <img src={item.foodItemImg} alt="" />
              <div className="cartItem-data">
                <h4>{item.foodItemName}</h4>
                <p>{item.restaurantName}</p>
                <div className="cartItem-inputs">
                  <div className="cartItem-input">
                    <button className="btn">Quantity:</button>
                    <input
                      type="number"
                      className="form-control quantity-field"
                      value={item.quantity}
                      min="1"
                      disabled
                    />
                  </div>
                  <h6>
                    Price: ₹{parseInt(item.price - (item.price * item.discount) / 100)}{' '}
                    <s>₹{item.price}</s>
                  </h6>
                </div>
                <button className="btn btn-outline-danger" onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cartPriceBody">
        <h4>Price Details</h4>
        <span>
          <b>Total MRP:</b>
          <p>₹{totalPrice}</p>
        </span>
        <span>
          <b>Discount:</b>
          <p style={{ color: 'green' }}>- ₹{totalDiscount}</p>
        </span>
        <span>
          <b>Delivery:</b>
          <p style={{ color: 'red' }}>+ ₹{deliveryCharges}</p>
        </span>
        <hr />
        <h5>
          <b>Final Price:</b> ₹{totalPrice - totalDiscount + deliveryCharges}
        </h5>
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Place Order
        </button>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Checkout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="checkout-address">
                <h4>Delivery Details</h4>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                  <label>Name</label>
                </div>

                <section>
                  <div className="form-floating mb-3 span-child-2">
                    <input type="text" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <label>Mobile</label>
                  </div>

                  <div className="form-floating mb-3 span-child-1">
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                  </div>
                </section>

                <section>
                  <div className="form-floating mb-3 span-child-1">
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <label>Address</label>
                  </div>

                  <div className="form-floating mb-3 span-child-2">
                    <input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                    <label>Pincode</label>
                  </div>
                </section>
              </div>

              <div className="checkout-payment-method">
                <h4>Payment</h4>
                <div className="form-floating mb-3">
                  <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="">Select</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                  <label>Payment Method</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={placeOrder}>
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
