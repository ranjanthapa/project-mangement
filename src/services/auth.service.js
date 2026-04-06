import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");
  validateUser(user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }
  const token = generateToken(user);
  return token;
};

const validateUser = (user) => {
  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  if (user.status !== "active") {
    const error = new Error("Your account is deactivated");
    error.status = 403;
    throw error;
  }
  const token = generateToken(user);

  return token;
};

const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
    expiresIn: expiresIn,
  });
  return token;
};
