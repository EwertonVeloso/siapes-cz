import type { Request, Response } from "express";
import AuthenticateUC from "../../domain/authenticate/usecases/authenticateUseCase.ts";

type ParamsBody = {
  email: string;
  password: string;
};

class AuthenticateController {
  async handle(req: Request, res: Response) {
    const { email,password } = req.body as ParamsBody;
    
    const result = await AuthenticateUC.execute({email,password});
    
    res.status(result.status).json(result.body);
    }
}

export default new AuthenticateController();