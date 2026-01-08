import type { Request, Response } from 'express';
import UpdateEmployeeUseCase from "../../domain/Employee/usecases/updateEmployeeUseCase.ts"
import type { UpdateEmployeeDTO } from '../../schemas/EmployeeSchema.ts';
import { validateZodUpdateEmployee } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts';
import { AppError } from '../../errors/appErrors.ts';

class UpdateEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const validationErrors = validateZodUpdateEmployee(req.body);

        if (validationErrors) {
            throw new AppErrorsZod(validationErrors.fieldErrors);
        }

        const employeeData = req.body as UpdateEmployeeDTO;
        const employeeId = req.params.id as string;

        if (Object.keys(employeeData).length === 0) {
             throw new AppError("Nenhum dado fornecido para atualizar.", 400);
        }

        const result = await UpdateEmployeeUseCase.execute(employeeId, employeeData);

        return res.status(result.status).json(result.body);

    }
}

export default new UpdateEmployeeController();