import { CreateEmployeeSchema } from "../schemas/EmployeeSchema.ts";

export function validateZodEmployee(data: unknown) {
  // O safeParse valida os dados contra o schema definido acima
  const result = CreateEmployeeSchema.safeParse(data);

  if (result.success) {
    return; // Retorna undefined se estiver tudo correto
  }

  // Se houver erros, formata para o padrão esperado pelo seu Controller
  const { fieldErrors } = result.error.flatten();
  
  return { fieldErrors };
}