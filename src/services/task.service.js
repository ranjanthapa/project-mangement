import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

export const updateTaskService = async (taskId, data, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    throw error;
  }

  if (task.assignedTo?.toString() !== userId.toString()) {
    const error = new Error("Only assigned user can update this task");
    error.status = 403;
    throw error;
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { status: data.status },
    { new: true, runValidators: true },
  );

  return updatedTask;
};

export const createTaskService = async (projectId, data, userId) => {
  await validateIsProjectOwner(projectId, userId);

  if (data.assignedTo) {
    await validateIsProjectMember(projectId, data.assignedTo);
  }

  const task = await Task.create({
    ...data,
    project: projectId,
    createdBy: userId,
  });

  return task;
};

export const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error("Task not found");
    error.status = 404;
    throw error;
  }

  await validateIsProjectOwner(task.project, userId);

  await Task.findByIdAndDelete(taskId);
};

export const getAllTasksService = async (projectId, query) => {
  const {
    page = 1,
    limit = 10,
    sort = "createdAt",
    status,
    priority,
    assignedTo,
    search,
  } = query;

  const skip = (page - 1) * limit;

  const filter = { project: projectId };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;
  if (search) {
    filter.$text = { $search: search };
  }

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
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

const validateIsProjectOwner = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  if (project.owner.toString() !== userId.toString()) {
    const error = new Error("Only project owner can perform this action");
    error.status = 403;
    throw error;
  }

  return project;
};

const validateIsProjectMember = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  const isMember = project.members.some(
    (member) => member.toString() === userId.toString(),
  );

  if (!isMember) {
    const error = new Error("User is not a member of this project");
    error.status = 403;
    throw error;
  }

  return project;
};
