import type { Request, Response } from 'express';
import GetCoordinatorByIdUseCase from "../../domain/Coordinator/usecases/getCoordinatorByIdUseCase.ts";
import { AppError } from "../../errors/appErrors.ts";

class GetCoordinatorByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const result = await GetCoordinatorByIdUseCase.execute(id);

    return res.status(result.status).json(result.body);
  }
}

export default new GetCoordinatorByIdController();
