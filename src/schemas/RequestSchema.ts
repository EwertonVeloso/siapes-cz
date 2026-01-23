import { z } from 'zod';

export const createRequestSchema = z.object({
  title: z.string("O título é obrigatório" ).min(5, "Título muito curto"),
  description: z.string( "A descrição é obrigatória" ),
  course: z.string("O curso é obrigatório"),
  students_number: z.number("Informe o número de alunos" ).int().positive(),
});

export const updateRequestSchema = createRequestSchema
  .pick({
    title: true,
    description: true,
    course: true,
    students_number: true,
  })
  .partial();

export type UpdateRequestDTO = z.infer<typeof updateRequestSchema>;
export type CreateRequestDTO = z.infer<typeof createRequestSchema>;