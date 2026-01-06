import type { Request, Response } from 'express';
// import { RegisterEmployeeUseCase } from '../../use-cases/registerEmployeeUseCase';
import type { CreateEmployeeDTO } from '../../schemas/EmployeeSchema.ts';
import { validateZodEmployee } from '../../service/zodvalidations.ts';

export class RegisterEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const employeeData: CreateEmployeeDTO = req.body;

            const validationErrors = validateZodEmployee(employeeData); 

            if (validationErrors) {
                return res.status(400).json({ 
                    message: "Erro nos dados enviados",
                    errors: validationErrors.fieldErrors 
                });
            }

            const registerEmployeeUseCase = new RegisterEmployeeUseCase();
            const result = await registerEmployeeUseCase.execute(employeeData);

            return res.status(201).json(result);

        } catch (error: any) {
            return res.status(400).json({ 
                error: error.message || "Erro inesperado." 
            });
        }
    }
}