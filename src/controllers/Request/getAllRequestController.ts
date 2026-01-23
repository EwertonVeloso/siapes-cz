import type { Request, Response } from 'express';
import getAllRequestUseCase from '../../domain/Request/usecases/getAllRequestUseCase.ts';

class GetAllRequestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { status, body } = await getAllRequestUseCase.execute();

    return res.status(status).json(body);
  }
}

export default new GetAllRequestController();