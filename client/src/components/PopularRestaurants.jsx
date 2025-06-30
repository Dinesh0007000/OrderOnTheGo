import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/PopularRestaurants.css';
import axiosInstance from './AxiosInstance';

const PopularRestaurants = () => {
  const [promotedRestaurants, setPromotedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPromotedRestaurants();
  }, []);

  const fetchPromotedRestaurants = async () => {
    try {
      setLoading(true);
      const promoteListResponse = await axiosInstance.get('/fetch-promoted-list');
      const promoteList = promoteListResponse.data;

      const restaurantsResponse = await axiosInstance.get('/fetch-restaurants');
      const allRestaurants = restaurantsResponse.data;

      const promoted = allRestaurants.filter((restaurant) => promoteList.includes(restaurant._id));
      setPromotedRestaurants(promoted);
      console.log('Promoted restaurant images:', promoted.map((r) => r.mainImg)); // Debug
      setError(null);
    } catch (err) {
      setError('Error fetching restaurants. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    return imagePath || 'https://via.placeholder.com/600x400?text=Image+Not+Available';
  };

  const settings = {
    dots: true,
    infinite: promotedRestaurants.length > 1,
    speed: 800,
    autoplay: promotedRestaurants.length > 1,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    lazyLoad: 'ondemand',
  };

  return (
    <div className="popular-carousel-container">
      <h2>Popular Restaurants</h2>
      {loading ? (
        <div className="loading">Loading restaurants...</div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : promotedRestaurants.length === 0 ? (
        <p className="no-restaurants">No promoted restaurants available...</p>
      ) : (
        <Slider {...settings}>
          {promotedRestaurants.map((rest) => (
            <div key={rest._id} className="carousel-slide">
              <div className="image-wrapper">
                <img
                  src={getImageUrl(rest.mainImg)}
                  alt={rest.title}
                  className="carousel-image"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available')}
                  loading="lazy"
                />
                <div className="image-loading-placeholder"></div>
              </div>
              <div className="carousel-caption">
                <h3>{rest.title}</h3>
                <p>{rest.cuisine || 'Cuisines'}</p>
                <span>{rest.price || 'Price not available'}</span>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PopularRestaurants;
