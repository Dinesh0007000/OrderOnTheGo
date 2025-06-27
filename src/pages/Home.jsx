import React, { useContext, useEffect, useState } from 'react';
import '../styles/Home.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import PopularRestaurants from '../components/PopularRestaurants';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const { user, searchTerm } = useContext(GeneralContext);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  };

  const handleRestaurantClick = (id) => {
    if (!user) {
      toast.warning("⚠️ Please log in to view restaurant details.");
      navigate('/auth');
    } else {
      navigate(`/restaurant/${id}`);
    }

  };

  return (
    <div className="HomePage">
      <PopularRestaurants />


      <div className="home-categories-container">
        <div className="home-category-card" onClick={() => toast.info("ℹ️ Please go to the restaurant section to view menu items.")}>
          <img
            src="https://www.lacademie.com/wp-content/uploads/2022/03/indian-breakfast-recipes-500x500.jpg"
            alt="Breakfast"
          />
          <h5>Breakfast</h5>
        </div>

        <div className="home-category-card" onClick={() => toast.info("ℹ️ Please go to the restaurant section to view menu items.")}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-VXaTJIkc6rk02DU8r7r9zR-KaeWvH1oKA&usqp=CAU"
            alt="Biryani"
          />
          <h5>Biryani</h5>
        </div>

        <div className="home-category-card" onClick={() => toast.info("ℹ️ Please go to the restaurant section to view menu items.")}>
          <img
            src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&w=1000&q=80"
            alt="Pizza"
          />
          <h5>Pizza</h5>
        </div>

        <div className="home-category-card" onClick={() => toast.info("ℹ️ Please go to the restaurant section to view menu items.")}>
          <img
            src="https://www.licious.in/blog/wp-content/uploads/2022/12/Shutterstock_2176816723.jpg"
            alt="Noodles"
          />
          <h5>Noodles</h5>
        </div>

        <div className="home-category-card" onClick={() => toast.info("ℹ️ Please go to the restaurant section to view menu items.")}>
          <img src="https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg" alt="Burger" />
          <h5>Burger</h5>
        </div>
      </div>


      <div className="restaurants-container">
        <div className="restaurants-body">
          <h3>All restaurants</h3>
          <div className="restaurants">
            {restaurants
              .filter((restaurant) =>
                restaurant.title.toLowerCase().includes(searchTerm)
              )
              .map((restaurant) => (
                <div className="restaurant-item" key={restaurant._id}>
                  <div className="restaurant" onClick={() => handleRestaurantClick(restaurant._id)}>
                    <img src={restaurant.mainImg} alt={restaurant.title} />
                    <div className="restaurant-data">
                      <h6>{restaurant.title}</h6>
                      <p>{restaurant.address}</p>
                    </div>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
