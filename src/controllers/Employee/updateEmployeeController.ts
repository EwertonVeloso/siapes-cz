import type { Request, Response } from 'express';
import UpdateEmployeeUseCase from "../../domain/Employee/usecases/updateEmployeeUseCase.ts"
import { validateZodUpdateEmployee } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts';
import { AppError } from '../../errors/appErrors.ts';

class UpdateEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const id = req.params.id as string ;
        
        const validation = validateZodUpdateEmployee(req.body);

        if (!validation.success) {
            throw new AppErrorsZod(validation.fieldErrors);
        }

        const data = validation.data;

        if (Object.keys(data).length === 0) {
             throw new AppError("Nenhum dado fornecido para atualizar.", 400);
        }

        const result = await UpdateEmployeeUseCase.execute(id, data);

        return res.status(result.status).json(result.body);

    }
}

export default new UpdateEmployeeController();