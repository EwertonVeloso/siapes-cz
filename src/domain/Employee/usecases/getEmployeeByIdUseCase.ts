import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class GetEmployeeByIdUseCase {
    async execute(id: string) {
        const employee = await employeeRepository.findById(id);

        if (!employee) {
            throw new AppError("Funcionário não encontrado.", 404);
        }
    
        return {
            status: 200,
            body: employee
        };
    }
}

export default new GetEmployeeByIdUseCase();