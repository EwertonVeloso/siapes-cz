import type { Request, Response } from 'express';
import updateStatusRequestUseCase from '../../domain/Request/usecases/updateStatusRequestUseCase.ts';
import { z } from 'zod';

export const updateStatusRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "O ID é obrigatório." });
  }

  const statusSchema = z.object({
    status: z.enum(['PENDING', 'ACCEPTED', 'REFUSED'])
  });

  const { status } = statusSchema.parse(req.body);

  const result = await updateStatusRequestUseCase.execute(id, status);

  return res.status(result.status).json(result.body);
};