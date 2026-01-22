import type { Request, Response } from 'express';
import updateRequestUseCase from '../../domain/Request/usecases/updateRequestUseCase.ts';
import { updateRequestSchema } from '../../schemas/RequestSchema.ts';

export const updateRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "O ID é obrigatório." });
  }

  const validatedData = updateRequestSchema.parse(req.body);

  
  const { status, body } = await updateRequestUseCase.execute(id, validatedData);

  return res.status(status).json(body);
};