import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  console.log("am i called", data);
  const { name, email, password, role, status } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    status,
  });
  const { password: _, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};

export const getAllUsersService = async (query) => {
  const { page = 1, limit = 10, sort = "createdAt" } = query;

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(),
  ]);

  return {
    users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};
