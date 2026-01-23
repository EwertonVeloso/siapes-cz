import type { Request, Response } from 'express';
import getRequestByIdUseCase from '../../domain/Request/usecases/getRequestByIdUseCase.ts';
import { AppError } from '../../errors/appErrors.ts';

class GetRequestByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; 
    if (!uuidRegex.test(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const { status, body } = await getRequestByIdUseCase.execute(id);

    return res.status(status).json(body);
  }
}

export default new GetRequestByIdController();