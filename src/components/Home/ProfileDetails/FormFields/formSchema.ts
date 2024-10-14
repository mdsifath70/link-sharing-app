import { isEmail } from "validator";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .optional()
    .refine((email) => !email || isEmail(email), {
      message: "Invalid email address",
    }),
  username: z.string().min(2, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export default formSchema;
