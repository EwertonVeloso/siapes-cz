import { compare, hash } from "bcryptjs";
import { AppError } from "../../../errors/appErrors.ts"
import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";

interface IChangePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

class ChangePasswordUseCase {
  async execute({ userId, oldPassword, newPassword }: IChangePasswordRequest) {
    
    const employee = await employeeRepository.findByIdWithPassword(userId);

    if (!employee) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const passwordMatch = await compare(oldPassword, employee.password);

    if (!passwordMatch) {
      throw new AppError("Senha incorreta.", 401);
    }

    if (await compare(newPassword, employee.password)) {
      throw new AppError("A nova senha deve ser diferente da atual.", 400);
    }

    const hashedPassword = await hash(newPassword, 8);

    await employeeRepository.updatePassword(userId, hashedPassword);

    return { message: "Senha alterada com sucesso." };
  }
}

export default new ChangePasswordUseCase();