import { z } from "zod";

const ROLES = ["ADMIN", "MANAGER", "PRECEPTOR"] as const;

export const CreateEmployeeSchema = z.object({
    professional_registration: z
    .string("Matrícula profissional é obrigatória" )
    .min(5, "Matrícula profissional deve ter no mínimo 5 caracteres"),

    name: z
    .string("Nome é obrigatório" )
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

    email: z
    .string("E-mail é obrigatório" )
    .email("E-mail inválido"),

    role: z
    .enum(ROLES)
    .default("PRECEPTOR"),

    password: z.coerce
    .string("Senha é obrigatória" )
    .min(6, "Senha deve ter pelo menos 6 caracteres"),

    phone: z
    .string()
    .optional(), 

    active: z
    .boolean()
    .default(true),
});

export type CreateEmployeeDTO = z.infer<typeof CreateEmployeeSchema>;

export const UpdateEmployeeSchema = CreateEmployeeSchema
  .omit({ 
    password: true, 
    role: true,    
    active: true,   
  })
  .partial();

export type UpdateEmployeeDTO = z.infer<typeof UpdateEmployeeSchema>;