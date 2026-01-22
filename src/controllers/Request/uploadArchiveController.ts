import type { Request, Response } from 'express';
import uploadArchiveUseCase from '../../domain/Request/usecases/uploadArchiveUseCase.ts';

export const uploadArchiveController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;

  if (!id) {
    return res.status(400).json({ error: "O ID da solicitação é obrigatório." });
  }

  if (!file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado." });
  }

  const { status, body } = await uploadArchiveUseCase.execute(id, file);

  return res.status(status).json(body);
};