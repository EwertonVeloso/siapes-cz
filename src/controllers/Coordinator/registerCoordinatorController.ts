import type { Request, Response } from 'express';
import RegisterCoordinatorUseCase from "../../domain/Coordinator/usecases/registerCoordinatorUseCase.ts";
import type { CreateCoordinatorDTO } from '../../schemas/CoordinatorSchema.ts';
import { validateZodCreateCoordinator } from '../../service/zodvalidations.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts';

class RegisterCoordinatorController {
  async handle(req: Request, res: Response): Promise<Response> {
    const validation = validateZodCreateCoordinator(req.body);

    if (validation.success===false) {
      throw new AppErrorsZod(validation.fieldErrors);
    }

    const result = await RegisterCoordinatorUseCase.execute(
      validation.data);

    return res.status(result.status).json(result.body);
  }
}

export default new RegisterCoordinatorController();
