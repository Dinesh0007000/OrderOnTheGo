// controllers/restaurantController.js
import { Restaurant } from '../schema.js';

const createRestaurant = async (req, res) => {
  try {
    const { title, address, mainImg, attributes } = req.body;
    const ownerId = req.user.id; // set in authMiddleware

    const restaurant = new Restaurant({
      ownerId,
      title,
      address,
      mainImg,
      attributes,
    });

    const savedRestaurant = await restaurant.save();
    res.json({ success: true, data: savedRestaurant, message: "Restaurant created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create restaurant" });
  }
};

export { createRestaurant };
