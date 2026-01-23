import type { Request, Response } from 'express';
import GetAllCoordinatorUseCase from "../../domain/Coordinator/usecases/getAllCoordinatorUseCase.ts";

class GetAllCoordinatorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const result = await GetAllCoordinatorUseCase.execute();

    return res.status(result.status).json(result.body);
  }
}

export default new GetAllCoordinatorController();
