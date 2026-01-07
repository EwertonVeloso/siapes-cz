import type { Request, Response } from 'express';
import RegisterEmployeeUseCase from "../../domain/Employee/usecases/registerEmployeeUseCase.ts"
import type { CreateEmployeeDTO } from '../../schemas/EmployeeSchema.ts';
import { validateZodEmployee } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts'; 

class RegisterEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const validationErrors = validateZodEmployee(req.body); 

        if (validationErrors) {
            throw new AppErrorsZod(validationErrors.fieldErrors);
        }

        const employeeData = req.body as CreateEmployeeDTO;

        const result = await RegisterEmployeeUseCase.execute(employeeData);

        return res.status(result.status).json(result.body);
    }
}

export default new RegisterEmployeeController();
