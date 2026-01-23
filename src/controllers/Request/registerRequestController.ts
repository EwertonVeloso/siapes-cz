import type { Request, Response } from 'express';
import registerRequestUseCase from '../../domain/Request/usecases/registerRequestUseCase.ts';
import { createRequestSchema } from '../../schemas/RequestSchema.ts';
import { AppError } from '../../errors/appErrors.ts';

export const registerRequestController = async (req: Request, res: Response) => {

  const validatedData = createRequestSchema.parse(req.body);

  if(!validatedData){
    throw new AppError('Invalid request data', 400);
  }

  const { status, body } = await registerRequestUseCase.execute(validatedData);

  return res.status(status).json(body);
};