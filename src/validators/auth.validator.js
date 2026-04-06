import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email").trim(),
  password: z.string(),
});

export default loginSchema;
