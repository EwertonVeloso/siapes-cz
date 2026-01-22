import type { Request, Response } from "express";
import UpdateEmployeeRoleUseCase from "../../domain/Employee/usecases/updateEmployeeRoleUseCase.ts";
import { AppError } from "../../errors/appErrors.ts"

class UpdateEmployeeRoleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;      
    const { role } = req.body;      
    const adminId = req.user.id;    

    if (!id) {
      throw new AppError("O parâmetro 'id' é obrigatório.", 400);
    }

    if (!role) {
      throw new AppError("O campo 'role' é obrigatório.", 400);
    }

    const result = await UpdateEmployeeRoleUseCase.execute({
      targetId: id,
      newRole: role,
      adminId
    });

    return res.json(result);
  }
}

export default new UpdateEmployeeRoleController();