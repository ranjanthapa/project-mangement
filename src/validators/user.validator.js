import { z } from "zod";
import { ROLE, STATUS } from "../enums/user.enum.js";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Please provide a valid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(Object.values(ROLE)).default(ROLE.USER),
  status: z.enum(Object.values(STATUS)).default(STATUS.ACTIVE),
});

export default createUserSchema;
