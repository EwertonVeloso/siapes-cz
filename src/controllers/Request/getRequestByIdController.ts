import type { Request, Response } from 'express';
import getRequestByIdUseCase from '../../domain/Request/usecases/getRequestByIdUseCase.ts';

export const getRequestByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "O ID é obrigatório." });
  }

  const { status, body } = await getRequestByIdUseCase.execute(id);

  return res.status(status).json(body);
};