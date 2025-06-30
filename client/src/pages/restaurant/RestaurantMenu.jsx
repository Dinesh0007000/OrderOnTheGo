import axiosInstance from '../../components/AxiosInstance';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantMenu = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const [AvailableCategories, setAvailableCategories] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);

    const [sortFilter, setSortFilter] = useState('popularity');
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);

    useEffect(() => {
        const init = async () => {
            try {
                const restRes = await axiosInstance.get(`/fetch-restaurant-details/${userId}`);
                setRestaurant(restRes.data);

                const categoriesRes = await axiosInstance.get('/fetch-categories');
                const itemsRes = await axiosInstance.get('/fetch-items');
                setItems(itemsRes.data);

                const allItemCategories = itemsRes.data.map(item => item.menuCategory);
                const allCategories = [...categoriesRes.data, ...allItemCategories];
                const uniqueCategories = [...new Set(allCategories)];

                setAvailableCategories(uniqueCategories);
                setVisibleItems(itemsRes.data);
            } catch (err) {
                console.error("Error loading restaurant data:", err);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (categoryFilter.length > 0 && typeFilter.length > 0) {
            setVisibleItems(items.filter(product =>
                categoryFilter.includes(product.menuCategory) &&
                typeFilter.includes(product.category)
            ));
        } else if (categoryFilter.length === 0 && typeFilter.length > 0) {
            setVisibleItems(items.filter(product =>
                typeFilter.includes(product.category)
            ));
        } else if (categoryFilter.length > 0 && typeFilter.length === 0) {
            setVisibleItems(items.filter(product =>
                categoryFilter.includes(product.menuCategory)
            ));
        } else {
            setVisibleItems(items);
        }
    }, [categoryFilter, typeFilter, items]);

    const handleCategoryCheckBox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setCategoryFilter([...categoryFilter, value]);
        } else {
            setCategoryFilter(categoryFilter.filter(cat => cat !== value));
        }
    };

    const handleTypeCheckBox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setTypeFilter([...typeFilter, value]);
        } else {
            setTypeFilter(typeFilter.filter(type => type !== value));
        }
    };

    const handleSortFilterChange = (e) => {
        const value = e.target.value;
        setSortFilter(value);
        const sortedItems = [...visibleItems];
        if (value === 'low-price') {
            sortedItems.sort((a, b) => a.price - b.price);
        } else if (value === 'high-price') {
            sortedItems.sort((a, b) => b.price - a.price);
        } else if (value === 'discount') {
            sortedItems.sort((a, b) => b.discount - a.discount);
        } else if (value === 'rating') {
            sortedItems.sort((a, b) => b.rating - a.rating);
        }
        setVisibleItems(sortedItems);
    };

    const handleDelete = async (productId) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) return;

        try {
            await axiosInstance.delete(`/delete-product/${productId}`);
            alert("Product deleted successfully");

            const updatedItems = items.filter(item => item._id !== productId);
            setItems(updatedItems);
            setVisibleItems(updatedItems);
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete product. Try again later.");
        }
    };

    if (!restaurant) {
        return (
            <div style={{ marginTop: '15vh', textAlign: 'center', color: 'gray' }}>
                Loading restaurant data...
            </div>
        );
    }

    return (
        <div className="AllRestaurantsPage" style={{ marginTop: '14vh' }}>
            <div className="restaurants-container">
                <div className="restaurants-filter">
                    <h4>Filters</h4>
                    <div className="restaurant-filters-body">
                        <div className="filter-sort">
                            <h6>Sort By</h6>
                            <div className="filter-sort-body sub-filter-body">
                                {["popularity", "low-price", "high-price", "discount", "rating"].map((type, idx) => (
                                    <div className="form-check" key={type + idx}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            value={type}
                                            onChange={handleSortFilterChange}
                                            id={`filter-sort-radio-${idx}`}
                                        />
                                        <label className="form-check-label" htmlFor={`filter-sort-radio-${idx}`}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="filter-categories">
                            <h6>Food Type</h6>
                            <div className="filter-categories-body sub-filter-body">
                                {["Veg", "Non Veg", "Beverages"].map((type, idx) => (
                                    <div className="form-check" key={type + idx}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={type}
                                            checked={typeFilter.includes(type)}
                                            onChange={handleTypeCheckBox}
                                            id={`filter-category-check-${idx}`}
                                        />
                                        <label className="form-check-label" htmlFor={`filter-category-check-${idx}`}>
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="filter-categories">
                            <h6>Categories</h6>
                            <div className="filter-categories-body sub-filter-body">
                                {AvailableCategories.map((category, idx) => (
                                    <div className="form-check" key={category + idx}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={category}
                                            checked={categoryFilter.includes(category)}
                                            onChange={handleCategoryCheckBox}
                                            id={`category-${idx}`}
                                        />
                                        <label className="form-check-label" htmlFor={`category-${idx}`}>
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="restaurants-body">
                    <h3>All Items</h3>
                    <div className="restaurants">
                        {visibleItems
                            .filter(item => item.restaurantId === restaurant._id)
                            .map(item => (
                                <div className="restaurant-item" key={item._id}>
                                    <div className="restaurant">
                                        <img src={item.itemImg} alt={item.title} />
                                        <div className="restaurant-data">
                                            <h6>{item.title}</h6>
                                            <p>{item.description.slice(0, 25)}...</p>
                                            <h6>&#8377; {item.price}</h6>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    className="theme-update-btn"
                                                    onClick={() => navigate(`/update-product/${item._id}`)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="theme-delete-btn"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
