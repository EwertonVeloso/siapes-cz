import type { Request, Response } from "express";
import UpdateEmployeeStatusUseCase from "../../domain/Employee/usecases/updateemployeeStatusUseCase.ts";
import { AppError } from "../../errors/appErrors.ts";

class UpdateEmployeeStatusController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { active } = req.body;

    if (!id) {
      throw new AppError("O parâmetro 'id' é obrigatório.", 400);
    }

    // Validação correta para booleanos
    if (typeof active !== "boolean") {
      throw new AppError("O campo 'active' é obrigatório e deve ser boolean.", 400);
    }

    const result = await UpdateEmployeeStatusUseCase.execute({ 
      id, 
      active 
    });

    return res.json(result);
  }
}

export default new UpdateEmployeeStatusController();