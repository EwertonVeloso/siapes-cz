import { AppError } from "../../../errors/appErrors.ts"
import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts"
import type { Employee } from "../../Employee/entity/Employee.ts";


interface IRequest {
  targetId: string;
  newRole: string;
  adminId: string;
}

class UpdateEmployeeRoleUseCase {
  async execute({ targetId, newRole, adminId }: IRequest) {

    const validRoles = ["ADMIN", "MANAGER", "PRECEPTOR"];

    const roleNormalized = newRole.toUpperCase();

    if (!validRoles.includes(roleNormalized)) {
      throw new AppError(
        "Papel inválido.",
        400
      );
    }

    if (targetId === adminId) {
      throw new AppError(
        "Operação não permitida. Você não pode alterar seu próprio cargo.",
        403
      );
    }

    const employee = await employeeRepository.findById(targetId);

    if (!employee) {
      throw new AppError("Funcionário não encontrado.", 404);
    }

    await employeeRepository.updateRole(targetId, roleNormalized as Employee['role']);

    return { 
      message: `Cargo do funcionário atualizado para ${roleNormalized}.` 
    };
  }
}

export default new UpdateEmployeeRoleUseCase();