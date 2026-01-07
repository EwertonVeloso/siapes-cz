import { CreateEmployeeSchema } from "../schemas/EmployeeSchema.ts";

export function validateZodEmployee(data: unknown) {
  const result = CreateEmployeeSchema.safeParse(data);

  if (result.success) {
    return; 
  }
  const { fieldErrors } = result.error.flatten();
  
  return { fieldErrors };
}