import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class deleteEmployeeUseCase {
    async execute(id: string) {
        const employee =  await employeeRepository.findById(id);
        if (!employee) {
            throw new AppError("Funcionário não encontrado.", 404);
        }

        await employeeRepository.delete(id);

        return {
            status: 200,
            body: {
                Message: "Funcionário deletado com sucesso."
            }
        }; 
    }
}

export default new deleteEmployeeUseCase();