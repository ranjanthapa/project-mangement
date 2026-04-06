import { Router } from "express";
import validateBody from "../middlewares/body-validate.middleware.js";
import createUserSchema from "../validators/user.validator.js";
import {
  getAllUsersController,
  userRegisterController,
} from "../controllers/user.controller.js";
import { protect, restrictTo } from "../middlewares/auth.middleware.js";
import { ROLE } from "../enums/user.enum.js";

const userRouter = Router();

userRouter.get("/", protect, restrictTo(ROLE.ADMIN), getAllUsersController);
userRouter.post("/", validateBody(createUserSchema), userRegisterController);

export default userRouter;
