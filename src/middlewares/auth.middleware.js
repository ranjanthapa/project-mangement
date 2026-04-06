import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      const error = new Error("Login Required");
      error.status = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error(
        "You do not have permission to perform this action",
      );
      error.status = 403;
      return next(error);
    }
    next();
  };
