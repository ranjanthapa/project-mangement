import express from "express";
import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import taskRouter from "./routers/task.router.js";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares/global-error-handler.middleware.js";
import projectRouter from "./routers/project.router.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use("/api/project", projectRouter);
app.use("/api/tasks", taskRouter);


app.use(errorHandler);

export default app;
