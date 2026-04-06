import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  deleteTaskController,
  updateTaskController
} from "../controllers/task.controller.js";
import validateBody from "../middlewares/body-validate.middleware.js";
import { updateTaskSchema } from "../validators/task.validator.js";

const taskRouter = Router();

taskRouter.patch(
  "/:id",
  protect,
  validateBody(updateTaskSchema),
  updateTaskController,
);

taskRouter.delete("/:id", protect, deleteTaskController);

export default taskRouter;
