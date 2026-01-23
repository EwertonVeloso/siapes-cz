import type { Request, Response } from 'express';
import updateStatusRequestUseCase from '../../domain/Request/usecases/updateStatusRequestUseCase.ts';
import { z } from 'zod';
import { AppError } from '../../errors/appErrors.ts';

class UpdateStatusRequestController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; 
    if (!uuidRegex.test(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const statusSchema = z.object({
      status: z.enum(['PENDING', 'ACCEPTED', 'REFUSED'])
    });

    const { status } = statusSchema.parse(req.body);

    const result = await updateStatusRequestUseCase.execute(id, status);

    return res.status(result.status).json(result.body);
  }
}

export default new UpdateStatusRequestController();