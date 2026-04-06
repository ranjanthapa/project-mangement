import { registerUser, getAllUsersService } from "../services/user.service.js";

export const userRegisterController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await registerUser(data);
    res.status(201).json({
      status: "success",
      message: "user registered successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    console.log("int the catch =.....");
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsersService(req.query);
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
