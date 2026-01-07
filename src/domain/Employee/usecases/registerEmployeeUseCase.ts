import { hash } from "bcryptjs";
import EmployeeRepository from "../../../databases/prismaRepository/EmployeeRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";
import type { CreateEmployeeDTO } from "../../../schemas/EmployeeSchema.ts";

class RegisterEmployeeUseCase {
  
  async execute(data: CreateEmployeeDTO) {
    
    const emailAlreadyExists = await EmployeeRepository.findByEmail(data.email);
    if (emailAlreadyExists) {
      throw new AppError("E-mail já cadastrado.", 400); 
    }

    const cpfAlreadyExists = await EmployeeRepository.findByCpf(data.cpf);
    if (cpfAlreadyExists) {
      throw new AppError("CPF já cadastrado.", 400);
    }

    const passwordHash = await hash(data.password, 8);

    const userCreated = await EmployeeRepository.create({
      ...data,
      password: passwordHash,
    });

    const { password, ...userSafeData } = userCreated;

    return { 
        status: 201, 
        body: userSafeData 
    };
  }
}

export default new RegisterEmployeeUseCase();