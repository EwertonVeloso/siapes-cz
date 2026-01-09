import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";

class GetAllEmployeeUseCase {
    async execute() {
        const employees = await employeeRepository.findAll();
    
        return {
            status: 200,
            body: employees
        };
    }
}

export default new GetAllEmployeeUseCase();