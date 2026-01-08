import { CreateEmployeeSchema } from "../schemas/EmployeeSchema.ts";
import { UpdateEmployeeSchema } from "../schemas/EmployeeSchema.ts";

export function validateZodCreateEmployee(data: unknown) {
  const result = CreateEmployeeSchema.safeParse(data);

  if (result.success) {
    return; 
  }
  const { fieldErrors } = result.error.flatten();
  
  return { fieldErrors };
}

export function validateZodUpdateEmployee(data: unknown) {
  const result = UpdateEmployeeSchema.safeParse(data);

  if (!result.success) {
    // Retorna os erros formatados
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  return { success: true, data: result.data };
}