import { z } from "zod";

const COORDINATOR_ROLE = ["COORDINATOR"] as const;

export const CreateCoordinatorSchema = z.object({
  registration: z
    .string("Matrícula é obrigatória")
    .min(5, "Matrícula deve ter no mínimo 5 caracteres"),

  name: z
    .string("Nome é obrigatório")
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  email: z
    .string("E-mail é obrigatório")
    .email("E-mail inválido"),

  role: z
    .enum(COORDINATOR_ROLE)
    .default("COORDINATOR"),

  password: z.coerce
    .string("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
    
  institutionId: z
    .string("A instituição é obrigatória" )
    .min(1, "Selecione uma instituição válida"),
});

export type CreateCoordinatorDTO = z.infer<typeof CreateCoordinatorSchema>;

export const UpdateCoordinatorSchema = CreateCoordinatorSchema
  .pick({
    name: true,
    email: true,
    registration: true
  })
  .partial();

export type UpdateCoordinatorDTO = z.infer<
  typeof UpdateCoordinatorSchema
>;

