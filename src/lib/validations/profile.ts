import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" })
    .optional(),
  weight: z.number()
    .min(20, { message: "Peso deve ser maior que 20kg" })
    .max(500, { message: "Peso deve ser menor que 500kg" })
    .optional(),
  height: z.number()
    .min(50, { message: "Altura deve ser maior que 50cm" })
    .max(300, { message: "Altura deve ser menor que 300cm" })
    .optional(),
  fitnessGoal: z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'health'], {
    errorMap: () => ({ message: "Selecione um objetivo válido" })
  }).optional(),
});

export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "Arquivo deve ter no máximo 10MB",
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: "Apenas imagens JPEG, PNG e WebP são permitidas",
      }
    ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type FileUploadData = z.infer<typeof fileUploadSchema>;
