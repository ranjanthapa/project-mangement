import { Router } from "express";
import validateBody from "../middlewares/body-validate.middleware.js";
import { loginController } from "../controllers/auth.controller.js";
import loginSchema from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/login", validateBody(loginSchema), loginController);

export default authRouter;
