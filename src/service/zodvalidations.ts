import type { CreateEmployeeDTO } from "../schemas/EmployeeSchema.ts";
import type { UpdateEmployeeDTO } from "../schemas/EmployeeSchema.ts";
import { CreateEmployeeSchema } from "../schemas/EmployeeSchema.ts";
import { UpdateEmployeeSchema } from "../schemas/EmployeeSchema.ts";

type ValidationResult <T> = { success: true; data: T } | { success: false; fieldErrors: Record<string, string[]> };

export function validateZodCreateEmployee(data: unknown): ValidationResult<CreateEmployeeDTO> {
  const result = CreateEmployeeSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data }; 
  }
  
  const { fieldErrors } = result.error.flatten();
  
  return { success: false, fieldErrors };
}

export function validateZodUpdateEmployee(data: unknown): ValidationResult<UpdateEmployeeDTO>{
  const result = UpdateEmployeeSchema.safeParse(data);

  if (!result.success) {
    return { success: false, fieldErrors: result.error.flatten().fieldErrors };
  }

  return { success: true, data: result.data }; 
}