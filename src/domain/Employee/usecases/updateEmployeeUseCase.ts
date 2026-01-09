import { AppError } from "../../../errors/appErrors.ts";
import EmployeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";
import type { UpdateEmployeeDTO } from "../../../schemas/EmployeeSchema.ts";

class UpdateEmployeeUseCase {
    
    async execute(employeeId: string, data: UpdateEmployeeDTO) {
        const employee = await EmployeeRepository.findById(employeeId);
        if (!employee) {
            throw new AppError("Funcionário não encontrado.", 404);
        }

        if(data.email){
            const emailAlreadyExists = await EmployeeRepository.findByEmail(data.email);
            if (emailAlreadyExists && emailAlreadyExists.id !== employeeId) {
                    throw new AppError("E-mail já cadastrado.", 409);
            }
        }
        if(data.professional_registration){
            const prAlreadyExists = await EmployeeRepository.findByPR(data.professional_registration);
            if (prAlreadyExists && prAlreadyExists.id !== employeeId) {
                    throw new AppError("Registro profissional já cadastrado.", 409);
            }
        }
        
        const updatedEmployee = await EmployeeRepository.update(employeeId, data);

        const { password, ...safeUpdatedEmployee } = updatedEmployee;

        return { 
            status: 200, 
            body: safeUpdatedEmployee 
        };
    }
}

export default new UpdateEmployeeUseCase();