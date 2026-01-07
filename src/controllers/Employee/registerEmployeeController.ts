import type { Request, Response } from 'express';
import { RegisterEmployeeUseCase } from "../../domain/Employee/usecases/registerEmployeeUseCase.ts"
import type { CreateEmployeeDTO } from '../../schemas/EmployeeSchema.ts';
import { validateZodEmployee } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/errorsZod.ts'; 

class RegisterEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const employeeData: CreateEmployeeDTO = req.body;

        const validationErrors = validateZodEmployee(employeeData); 

        if (validationErrors) {
            throw new AppErrorsZod(validationErrors.fieldErrors);
        }

        const registerEmployeeUseCase = new RegisterEmployeeUseCase();
        const result = await registerEmployeeUseCase.execute(employeeData);

        return res.status(201).json(result);
    }
}

export default new RegisterEmployeeController();
