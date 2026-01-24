import { prismaService, PrismaClient } from "../../service/prisma.ts"
import type { Employee } from "../../domain/Employee/entity/Employee.ts";
import type { CreateEmployeeDTO } from "../../schemas/EmployeeSchema.ts";
import type { UpdateEmployeeDTO } from "../../schemas/EmployeeSchema.ts";


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

  async findById(id: string): Promise<Omit<Employee, "password"> | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
        return null;
    }
  
    const { password, ...safeEmployeeData } = employee;
    return safeEmployeeData;
        
  }

  async findByIdWithPassword(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }

  //findByProfessional_registration
  async findByPR(professional_registration: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { professional_registration },
    });
    return employee;
  }

  async findAll(): Promise<Omit<Employee, "password">[]>{
    const employees = await this.prisma.employee.findMany();

    return employees.map((employee) => {
            const { password, ...safeEmployeeData } = employee;
            return safeEmployeeData;
        });
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

  async update(id: string, data: UpdateEmployeeDTO): Promise<Employee> {
    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        professional_registration: data.professional_registration,
      }
    });
    return updatedEmployee;
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
   await this.prisma.$transaction([
      this.prisma.employee.update({
        where: { id },
        data: { password: passwordHash },
      }),

      this.prisma.refreshToken.deleteMany({
        where: { userId: id },
      })
    ]);
  }

  async updateStatus(id: string, isActive: boolean): Promise<void> {
    await this.prisma.employee.update({
      where: { id },
      data: {
        active: isActive, 
      },
    });
  }

  async updateRole(id: string, role: Employee['role']): Promise<void> {
    await this.prisma.employee.update({
      where: { id },
      data: {
        role: role, 
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.employee.delete({
      where: { id },
    });
  }
}

export default new EmployeeRepository(prismaService);