import { login } from "../services/auth.service.js";

export const loginController = async (req, res, next) => {
  try {
    const data = req.body;
    const token = await login(data);
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};
