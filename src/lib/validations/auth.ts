import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  password: z.string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "Senha deve ter no máximo 100 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Email inválido" })
    .max(255, { message: "Email deve ter no máximo 255 caracteres" }),
  password: z.string()
    .min(1, { message: "Senha é obrigatória" })
    .max(100, { message: "Senha deve ter no máximo 100 caracteres" }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
