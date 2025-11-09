import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be at most 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email" })
    .max(255, { message: "Email must be at most 255 characters" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Invalid email" })
    .max(255, { message: "Email must be at most 255 characters" }),
  password: z.string()
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password must be at most 100 characters" }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
