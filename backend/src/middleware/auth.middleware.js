import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Extract JWT token from request header
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify JWT token and get user data from database
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if user exists in the database and return it if it does
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user data to the request object for use in other routes
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protect route middleware", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
