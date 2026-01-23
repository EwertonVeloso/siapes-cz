import type { Request, Response } from 'express';
import UpdateCoordinatorUseCase from "../../domain/Coordinator/usecases/updateCoordinatorUseCase.ts";
import { validateZodUpdateCoordinator } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts';
import { AppError } from '../../errors/appErrors.ts';

class UpdateCoordinatorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const validation = validateZodUpdateCoordinator(req.body);

    if (validation.success===false) {
      throw new AppErrorsZod(validation.fieldErrors);
    }

    const data = validation.data;

    if (Object.keys(data).length === 0) {
      throw new AppError("Nenhum dado fornecido para atualizar.", 400);
    }

    const result = await UpdateCoordinatorUseCase.execute(id, data);

    return res.status(result.status).json(result.body);
  }
}

export default new UpdateCoordinatorController();
