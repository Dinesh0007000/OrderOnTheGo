import React, { useContext, useEffect, useState } from 'react'
import '../../styles/IndividualRestaurant.css'
import axiosInstance from '../../components/AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
import { toast } from 'react-toastify';

const IndividualRestaurant = () => {
    const { fetchCartCount } = useContext(GeneralContext);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState();
    const [AvailableCategories, setAvailableCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchItems();
        fetchRestaurants();
    }, [])

    const fetchRestaurants = async () => {
        await axiosInstance.get(`/fetch-restaurant/${id}`).then(
            (response) => {
                setRestaurant(response.data);
            }
        ).catch((err) => {
            console.log(err);
        })
    }

    const fetchCategories = async () => {
        await axiosInstance.get('/fetch-categories').then(
            (response) => {
                setAvailableCategories(response.data);
            }
        )
    }

    const fetchItems = async () => {
        await axiosInstance.get(`/fetch-items`).then(
            (response) => {
                setItems(response.data);
                setVisibleItems(response.data);
            }
        )
    }

    const [sortFilter, setSortFilter] = useState('popularity');
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [typeFilter, settypeFilter] = useState([]);

    const handleCategoryCheckBox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setCategoryFilter([...categoryFilter, value]);
        } else {
            setCategoryFilter(categoryFilter.filter(size => size !== value));
        }
    }

    const handleTypeCheckBox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            settypeFilter([...typeFilter, value]);
        } else {
            settypeFilter(typeFilter.filter(size => size !== value));
        }
    }

    const handleSortFilterChange = (e) => {
        const value = e.target.value;
        setSortFilter(value);
        if (value === 'low-price') {
            setVisibleItems([...visibleItems].sort((a, b) => a.price - b.price))
        } else if (value === 'high-price') {
            setVisibleItems([...visibleItems].sort((a, b) => b.price - a.price))
        } else if (value === 'discount') {
            setVisibleItems([...visibleItems].sort((a, b) => b.discount - a.discount))
        } else if (value === 'rating') {
            setVisibleItems([...visibleItems].sort((a, b) => b.rating - a.rating))
        }
    }

    useEffect(() => {
        if (categoryFilter.length > 0 && typeFilter.length > 0) {
            setVisibleItems(items.filter(product => categoryFilter.includes(product.menuCategory) && typeFilter.includes(product.category)));
        } else if (categoryFilter.length === 0 && typeFilter.length > 0) {
            setVisibleItems(items.filter(product => typeFilter.includes(product.category)));
        } else if (categoryFilter.length > 0 && typeFilter.length === 0) {
            setVisibleItems(items.filter(product => categoryFilter.includes(product.menuCategory)));
        } else {
            setVisibleItems(items);
        }
    }, [categoryFilter, typeFilter]);

    const [cartItem, setCartItem] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = async (foodItemId, foodItemName, restaurantId, foodItemImg, price, discount) => {
        if (quantity <= 0) {
            toast.error("Please enter a quantity greater than 0");
            return;
        }
        await axiosInstance.post('/add-to-cart', { userId, foodItemId, foodItemName, restaurantId, foodItemImg, price, discount, quantity }).then(
            (response) => {
                alert("product added to cart!!");
                setCartItem('');
                setQuantity(0);
                fetchCartCount();
            }
        ).catch((err) => {
            alert("Operation failed!!");
        })
    }

    return (
        <div className="IndividualRestaurant-page">
            {
                restaurant ?
                    <>
                        <h2>{restaurant?.title}</h2>
                        <p>{restaurant?.address}</p>


                        <div className="filter-bar">
                            <div className="filter-group">
                                <span className="filter-label">Sort:</span>
                                {['Popularity', 'Low Price', 'High Price', 'Discount', 'Rating'].map(option => (
                                    <button
                                        key={option}
                                        className={`filter-btn ${sortFilter === option.toLowerCase().replace(" ", "-") ? 'active' : ''}`}
                                        onClick={() => handleSortFilterChange({ target: { value: option.toLowerCase().replace(" ", "-") } })}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            <div className="filter-group">
                                <span className="filter-label">Type:</span>
                                {['Veg', 'Non Veg', 'Beverages'].map(type => (
                                    <button
                                        key={type}
                                        className={`filter-btn ${typeFilter.includes(type) ? 'active' : ''}`}
                                        onClick={() => {
                                            const checked = !typeFilter.includes(type);
                                            handleTypeCheckBox({ target: { value: type, checked } });
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="filter-group">
                                <span className="filter-label">Category:</span>
                                {AvailableCategories.map(category => (
                                    <button
                                        key={category}
                                        className={`filter-btn ${categoryFilter.includes(category) ? 'active' : ''}`}
                                        onClick={() => {
                                            const checked = !categoryFilter.includes(category);
                                            handleCategoryCheckBox({ target: { value: category, checked } });
                                        }}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="restaurants-body">
                            <h3>All Items</h3>
                            <div className="restaurants">
                                {visibleItems.filter(item => item.restaurantId === restaurant._id).map((item) => (
                                    <div className='restaurant-item' key={item._id}>
                                        <div className="restaurant">
                                            <img src={item.itemImg} alt="" />
                                            <div className="restaurant-data">
                                                <h6>{item.title}</h6>
                                                <p>{item.description.slice(0, 25) + '...'}</p>
                                                <h6>₹ {parseInt(item.price - (item.price * item.discount) / 100)} <s>{item.price}</s></h6>
                                                {cartItem === item._id ?
                                                    <>
                                                        <input type="number" placeholder='Qty' style={{ width: '60px', margin: '10px 0', fontSize: '0.7rem' }} onChange={(e) => setQuantity(e.target.value)} /><br />
                                                        <button className='theme-add-btn' onClick={() => handleAddToCart(item._id, item.title, item.restaurantId, item.itemImg, item.price, item.discount)}>Add to cart</button>
                                                    </>
                                                    :
                                                    <button className='theme-add-btn' onClick={() => setCartItem(item._id)}>Add item</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                    :
                    <p>No data found</p>
            }
        </div>
    )
}

export default IndividualRestaurant;
