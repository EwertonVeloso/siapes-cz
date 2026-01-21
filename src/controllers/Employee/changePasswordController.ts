import type { Request, Response } from "express";
import ChangePasswordUseCase from "../../domain/Employee/usecases/changePasswordUseCase.ts";

class ChangePasswordController {
  async handle(req: Request, res: Response) {
    const userId = req.user.id; 
    
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Informe a senha antiga e a nova." });
    }

    await ChangePasswordUseCase.execute({
      userId,
      oldPassword,
      newPassword
    });

    return res.status(200).json({ message: "Senha atualizada!" });
  }
}

export default new ChangePasswordController();