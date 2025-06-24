import { FoodItem ,Restaurant} from '../schema.js';

// 🔹 Get all food items (with optional filtering)
const getAllFoodItems = async (req, res) => {
  try {
    const { restaurantId, category } = req.query;
    const filter = {};

    if (restaurantId) filter.restaurantId = restaurantId;
    if (category) filter.category = category;

    const foodItems = await FoodItem.find(filter);
    res.json({ success: true, foodItems });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔹 Get single food item by ID
const getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json({ success: true, foodItem });
  } catch (error) {
    console.error("Error getting food item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const createFoodItem = async (req, res) => {
    try {
      const {
        title,
        desc,
        image,
        menuType,
        category,
        restaurantId,
        price,
        discount,
        rating
      } = req.body;
  
      // Create new food item
      const newFood = new FoodItem({
        title,
        desc,
        image,
        menuType,
        category,
        restaurantId,
        price,
        discount,
        rating
      });
  
      const savedFoodItem = await newFood.save();
  
      // Link it to restaurant menu
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ success: false, message: "Restaurant not found" });
      }
  
      restaurant.menu.push(savedFoodItem._id);
      await restaurant.save();
  
      res.json({ success: true, message: "Food item added and linked to restaurant", foodItem: savedFoodItem });
  
    } catch (error) {
      console.error("Error creating and linking food item:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

// 🔹 Update a food item
const updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await FoodItem.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json({ success: true, message: "Food item updated", foodItem: updated });
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔹 Delete a food item
const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await FoodItem.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json({ success: true, message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// GET /api/food?foodType=veg&category=pizza&sortBy=priceLow
const getFilteredFoodItems = async (req, res) => {
    try {
      const { foodType, category, sortBy } = req.query;
  
      let filter = {};
      if (foodType) filter.menuType = foodType;
      if (category) filter.category = category;
  
      let sort = {};
  
      switch (sortBy) {
        case 'priceLow':
          sort.price = 1;
          break;
        case 'priceHigh':
          sort.price = -1;
          break;
        case 'rating':
          sort.rating = -1;
          break;
        case 'discount':
          sort.discount = -1;
          break;
        case 'popularity':
          // Let's say higher rating = more popular (customizable later)
          sort.rating = -1;
          break;
        default:
          sort = {}; // no sort
      }
  
      const foodItems = await FoodItem.find(filter).sort(sort);
      res.json({ success: true, foodItems });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error fetching food items" });
    }
  };

export {
  getAllFoodItems,
  getFoodItemById,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFilteredFoodItems
};
