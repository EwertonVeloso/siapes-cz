import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;

export const CreateEmployeeSchema = z.object({
    professional_registration: z
    .string("Matrícula profissional é obrigatória" )
    .min(5, "Matrícula profissional deve ter no mínimo 5 caracteres"),

    cpf: z
    .string("CPF é obrigatório" )
    .regex(cpfRegex, "CPF formato inválido. Use aaa.aaa.aaa-aa ou apenas números"),

    name: z
    .string("Nome é obrigatório" )
    .trim()
    .min(3, "Nome deve ter pelo menos 3 caracteres"),

    email: z
    .string("E-mail é obrigatório" )
    .email("E-mail inválido"),

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