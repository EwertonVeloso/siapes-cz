import type { Request, Response } from "express";
import LogoutUseCase from "../../domain/authenticate/usecases/logoutUseCase.ts";

class LogoutController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    if (refresh_token) {
      await LogoutUseCase.execute(refresh_token);
    }

    return res.status(204).send();
  }
}

export default new LogoutController();