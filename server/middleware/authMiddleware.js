import jwt from 'jsonwebtoken';
import { User } from '../schema.js';

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  // Check for Bearer token
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const token = authorization.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token,process.env.JWT_SECRET); // Decode token

    const user = await User.findById(decoded.id); // Find user by ID
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token or user not found" });
    }

    // Attach user info to request object
    req.user = {
      id: user._id,
      userType: user.userType,
      approval: user.approval
    };

    next(); // Continue to the route
  } catch (err) {
    console.error("JWT Middleware Error:", err);
    res.status(401).json({ success: false, message: "Token error" });
  }
};

export default authMiddleware;
