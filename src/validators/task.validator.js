import { z } from "zod";
import { TaskStatus, TaskPriority } from "../enums/task.enum.js";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().trim().optional(),
  status: z.enum(Object.values(TaskStatus)).default(TaskStatus.TODO),
  priority: z.enum(Object.values(TaskPriority)).default(TaskPriority.MEDIUM),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
});




export const updateTaskSchema = z.object({
  status: z.enum(Object.values(TaskStatus)).default(TaskStatus.TODO),
});

