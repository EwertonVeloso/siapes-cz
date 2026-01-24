import type { Request, Response } from "express";
import RefreshTokenUseCase from "../../domain/authenticate/usecases/refreshTokenUseCase.ts";

class RefreshTokenController {
  async handle(req: Request, res: Response) {
 
    const { refresh_token } = req.body;

    const result = await RefreshTokenUseCase.execute(refresh_token);

    return res.status(200).json(result);
  }
}

export default new RefreshTokenController();