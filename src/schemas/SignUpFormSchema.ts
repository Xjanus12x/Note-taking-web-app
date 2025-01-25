import { z } from "zod";
export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" }),

    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(16, { message: "Password must be at most 16 characters" }),

    repeatPassword: z
      .string()
      .nonempty({ message: "Repeat Password is required" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"], // Attach error to the repeatPassword field
  });

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>;
