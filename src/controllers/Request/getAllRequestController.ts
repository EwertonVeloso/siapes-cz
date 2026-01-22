import type { Request, Response } from 'express';
import getAllRequestUseCase from '../../domain/Request/usecases/getAllRequestUseCase.ts';

export const getAllRequestController = async (req: Request, res: Response) => {
 
  const { status, body } = await getAllRequestUseCase.execute();

  return res.status(status).json(body);
};