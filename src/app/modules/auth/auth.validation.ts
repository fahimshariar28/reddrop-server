import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const authValidation = {
  loginValidationSchema,
};
