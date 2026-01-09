import type { Request, Response } from 'express';
import GetAllEmployeeUseCase from "../../domain/Employee/usecases/getAllEmployeeUseCase.ts"

class GetAllEmployeeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const result = await GetAllEmployeeUseCase.execute();

        return res.status(result.status).json(result.body);
    }
}

export default new GetAllEmployeeController();
