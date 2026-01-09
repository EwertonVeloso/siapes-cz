import type { Request, Response } from 'express';
import RegisterEmployeeUseCase from "../../domain/Employee/usecases/registerEmployeeUseCase.ts"
import type { CreateEmployeeDTO } from '../../schemas/EmployeeSchema.ts';
import { validateZodCreateEmployee } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts'; 

class RegisterEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const validation = validateZodCreateEmployee(req.body); 

        if (!validation.success) {
            throw new AppErrorsZod(validation.fieldErrors);
        }

        const result = await RegisterEmployeeUseCase.execute(validation.data);

        return res.status(result.status).json(result.body);
    }
}

export default new RegisterEmployeeController();