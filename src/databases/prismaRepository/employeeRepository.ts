import { prismaService, PrismaClient } from "../../service/prisma.ts"
import type { Employee } from "../../domain/Employee/entity/Employee.ts";
import type { CreateEmployeeDTO } from "../../schemas/EmployeeSchema.ts";


class EmployeeRepository {
    private prisma: PrismaClient;
    
    constructor(prismaService: PrismaClient) {
        this.prisma = prismaService
    }
  
  async findByEmail(email: string) : Promise<Employee | null>{
    const employee = await this.prisma.employee.findUnique({
      where: { email },
    });
    return employee;
  }

  //findByProfessional_registration
  async findByPR(professional_registration: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { professional_registration },
    });
    return employee;
  }

  async create(data: CreateEmployeeDTO): Promise<Employee> {
    const employee = await this.prisma.employee.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, 
        professional_registration: data.professional_registration,
        role: data.role,     
        active: data.active, 
        phone: data.phone || "",
      },
    });

    return employee;
  }
}

export default new EmployeeRepository(prismaService);