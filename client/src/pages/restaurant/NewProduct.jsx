import React, { useEffect, useState } from 'react';
import '../../styles/NewProducts.css';
import axiosInstance from '../../components/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productMenuCategory, setProductMenuCategory] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscount, setProductDiscount] = useState('');

  const [AvailableCategories, setAvailableCategories] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCategoriesAndItems();
    fetchRestaurant();
  }, []);

  const fetchCategoriesAndItems = async () => {
    const categoriesRes = await axiosInstance.get('/fetch-categories');
    const itemsRes = await axiosInstance.get('/fetch-items');
    setItems(itemsRes.data);

    const itemCategories = itemsRes.data.map(item => item.menuCategory);
    const allCategories = [...categoriesRes.data, ...itemCategories];
    const uniqueCategories = [...new Set(allCategories)];
    setAvailableCategories(uniqueCategories);
  };

  const fetchRestaurant = async () => {
    const response = await axiosInstance.get(`/fetch-restaurant-details/${userId}`);
    setRestaurant(response.data);
  };

  const validateForm = () => {
    const errs = {};
    if (!productName) errs.name = 'Required';
    if (!productDescription) errs.description = 'Required';
    if (!productMainImg) errs.img = 'Required';
    if (!productCategory) errs.type = 'Required';
    if (!productMenuCategory) errs.menu = 'Required';
    if (!productPrice || productPrice <= 0) errs.price = 'Enter valid price';
    if (productDiscount < 0) errs.discount = 'Invalid discount';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNewProduct = async () => {
    if (!validateForm()) return;

    const selectedCategory = productMenuCategory === 'new category' ? productNewCategory : productMenuCategory;

    const isDuplicate = items.some(item =>
      item.title?.toLowerCase().trim() === productName.toLowerCase().trim() &&
      item.description?.toLowerCase().trim() === productDescription.toLowerCase().trim() &&
      parseFloat(item.price) === parseFloat(productPrice) &&
      item.category === productCategory &&
      item.menuCategory === selectedCategory &&
      item.itemImg === productMainImg
    );

    if (isDuplicate) {
      alert("This exact product already exists in your menu.");
      return;
    }

    if (!restaurant?._id) {
      alert("Restaurant not loaded yet. Please wait.");
      return;
    }

    await axiosInstance.post('/add-new-product', {
      restaurantId: restaurant._id,
      productName,
      productDescription,
      productMainImg,
      productCategory,
      productMenuCategory: selectedCategory,
      productNewCategory,
      productPrice,
      productDiscount
    });

    alert("Product added successfully");
    navigate('/restaurant-menu');
  };

  useEffect(() => {
    if (productMainImg) setImagePreview(productMainImg);
  }, [productMainImg]);

  return (
    <div className="new-product-page">
      <div className="new-product-container">
        <h3>Add New Product</h3>

        <div className="new-product-body">

          <div className="image-preview-block">
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="image-preview" />
            ) : (
              <div className="image-placeholder">Image preview</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={productMainImg} onChange={(e) => setProductMainImg(e.target.value)} />
            <label>Image URL</label>
            {errors.img && <small className="error-text">{errors.img}</small>}
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <label>Product Name</label>
            {errors.name && <small className="error-text">{errors.name}</small>}
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            <label>Description</label>
            {errors.description && <small className="error-text">{errors.description}</small>}
          </div>

          <section>
            <h4>Food Type</h4>
            <div className="radio-group">
              {["Veg", "Non Veg", "Beverages"].map((type, index) => (
                <div className="form-check" key={index}>
                  <input className="form-check-input" type="radio" name="productCategory" value={type} onChange={(e) => setProductCategory(e.target.value)} />
                  <label className="form-check-label">{type}</label>
                </div>
              ))}
              {errors.type && <small className="error-text">{errors.type}</small>}
            </div>
          </section>

          <div className="form-row">
            <div className="form-floating mb-3">
              <select className="form-select" value={productMenuCategory} onChange={(e) => setProductMenuCategory(e.target.value)}>
                <option value="">Choose a category</option>
                {AvailableCategories.map((cat, i) => (
                  <option value={cat} key={i}>{cat}</option>
                ))}
                <option value="new category">+ Add new category</option>
              </select>
              <label>Category</label>
              {errors.menu && <small className="error-text">{errors.menu}</small>}
            </div>

            {productMenuCategory === 'new category' && (
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={productNewCategory} onChange={(e) => setProductNewCategory(e.target.value)} />
                <label>New Category Name</label>
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-floating mb-3">
              <input type="number" className="form-control" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
              <label>Price</label>
              {errors.price && <small className="error-text">{errors.price}</small>}
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
              <label>Discount (%)</label>
              {errors.discount && <small className="error-text">{errors.discount}</small>}
            </div>
          </div>
        </div>

        <button className="theme-btn" onClick={handleNewProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default NewProduct;
