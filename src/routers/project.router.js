import { Router } from "express";
import {
  addMemberController,
  createProjectController,
  removeMemberController,
} from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

import {
  createTaskController,
  getAllTasksController,
} from "../controllers/task.controller.js";
import validateBody from "../middlewares/body-validate.middleware.js";
import { createTaskSchema } from "../validators/task.validator.js";

const projectRouter = Router();

projectRouter.post("/", protect, createProjectController);
projectRouter.get("/:projectId/tasks", protect, getAllTasksController);

projectRouter.post(
  "/:projectId/task",
  protect,
  validateBody(createTaskSchema),
  createTaskController,
);

projectRouter.delete(
  "/:projectId/members/:memberId",
  protect,
  removeMemberController,
);

projectRouter.post("/:projectId/:memberId", protect, addMemberController);

export default projectRouter;
