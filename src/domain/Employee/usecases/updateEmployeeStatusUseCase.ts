import { AppError } from "../../../errors/appErrors.ts"
import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts"

interface IRequest {
  id: string;
  active: boolean; 
}

class UpdateEmployeeStatusUseCase {
  async execute({ id, active }: IRequest) {

    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new AppError("Funcionário não encontrado", 404);
    }

    await employeeRepository.updateStatus(id, active);
    
    return { message: `Status do funcionário atualizado para ${active ? 'Ativo' : 'Inativo'}` };
  }
}

export default new UpdateEmployeeStatusUseCase();