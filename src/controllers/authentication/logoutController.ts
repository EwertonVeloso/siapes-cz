import type { Request, Response } from "express";
import LogoutUseCase from "../../domain/authenticate/usecases/logoutUseCase.ts";

class LogoutController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token ausente." });
    }

    const [, token] = authHeader.split(" ") as [string, string];

    await LogoutUseCase.execute(token, refresh_token);

    return res.status(204).send();
  }
}

export default new LogoutController();