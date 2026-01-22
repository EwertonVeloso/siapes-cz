import type { Request, Response } from 'express';
import deleteRequestUseCase from '../../domain/Request/usecases/deleteRequestUseCase.ts';

export const deleteRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "O ID é obrigatório." });
  }

  const { status, body } = await deleteRequestUseCase.execute(id);

  return res.status(status).json(body);
};