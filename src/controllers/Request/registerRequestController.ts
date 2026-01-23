import type { Request, Response } from 'express';
import registerRequestUseCase from '../../domain/Request/usecases/registerRequestUseCase.ts';
import type { CreateRequestDTO } from '../../schemas/RequestSchema.ts';
import { createRequestSchema } from '../../schemas/RequestSchema.ts';
import { AppErrorsZod } from '../../errors/zodErrors.ts';

class RegisterRequestController {
    async handle(req: Request, res: Response): Promise<Response> {
        const validation = createRequestSchema.safeParse(req.body);

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            throw new AppErrorsZod(fieldErrors);
        }

        const result = await registerRequestUseCase.execute(validation.data);

        return res.status(result.status).json(result.body);
    }
}

export default new RegisterRequestController();