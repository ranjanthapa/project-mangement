import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
} from "../services/task.service.js";

export const createTaskController = async (req, res, next) => {
  try {
    console.log(req.params);
    const { projectId } = req.params;
    const data = req.body;
    console.log({ data });
    const task = await createTaskService(projectId, data, req.user._id);

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
  try {
    console.log("hellooooo............");
    const { id } = req.params;
    const task = await updateTaskService(id, req.body, req.user._id);
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteTaskService(id, req.user._id);
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasksController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const result = await getAllTasksService(projectId, req.query);
    res.status(200).json({
      status: "success",
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
