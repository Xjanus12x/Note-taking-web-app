import { z } from "zod";
export const SignInFormSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export type SignInFormFields = z.infer<typeof SignInFormSchema>;
