import { compare, hash } from "bcryptjs";
import { AppError } from "../../../errors/appErrors.ts";

import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";
import coordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts"; 

interface IChangePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

class ChangePasswordUseCase {
  async execute({ userId, oldPassword, newPassword }: IChangePasswordRequest) {
    
    let user = null;
    let isEmployee = false;

    const employee = await employeeRepository.findByIdWithPassword(userId);
    if (employee) {
      user = employee;
      isEmployee = true;
    } else {
      const coordinator = await coordinatorRepository.findByIdWithPassword(userId);
      if (coordinator) {
        user = coordinator;
        isEmployee = false;
      }
    }

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const passwordMatch = await compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new AppError("Senha antiga incorreta.", 401);
    }

    const isSamePassword = await compare(newPassword, user.password);
    if (isSamePassword) {
      throw new AppError("A nova senha deve ser diferente da atual.", 400);
    }

    const hashedPassword = await hash(newPassword, 8);

    if (isEmployee) {
      await employeeRepository.updatePassword(userId, hashedPassword);
    } else {
      await coordinatorRepository.updatePassword(userId, hashedPassword);
    }

    return { message: "Senha alterada com sucesso." };
  }
}

export default new ChangePasswordUseCase();