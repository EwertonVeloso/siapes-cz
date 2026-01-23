import { prismaService, PrismaClient } from "../../service/prisma.ts";
import type { Coordinator } from "../../domain/Coordinator/entity/Coordinator.ts";
import type {
  CreateCoordinatorDTO,
  UpdateCoordinatorDTO,
} from "../../schemas/CoordinatorSchema.ts";

class CoordinatorRepository {
  private prisma: PrismaClient;

  constructor(prismaService: PrismaClient) {
    this.prisma = prismaService;
  }

  async findByEmail(email: string): Promise<Coordinator | null> {
    const coordinator = await this.prisma.coordinator.findUnique({
      where: { email },
    });
    return coordinator;
  }

  async findById(
    id: string
  ): Promise<Omit<Coordinator, "password"> | null> {
    const coordinator = await this.prisma.coordinator.findUnique({
      where: { id },
    });

    if (!coordinator) {
      return null;
    }

    const { password, ...safeCoordinatorData } = coordinator;
    return safeCoordinatorData;
  }

  async findByR(
    registration: string
  ): Promise<Coordinator | null> {
    const coordinator = await this.prisma.coordinator.findUnique({
      where: { registration },
    });
    return coordinator;
  }

  async findAll(): Promise<Omit<Coordinator, "password">[]> {
    const coordinators = await this.prisma.coordinator.findMany();

    return coordinators.map((coordinator: any) => {
      const { password, ...safeCoordinatorData } = coordinator;
      return safeCoordinatorData;
    });
  }

  async create(
    data: CreateCoordinatorDTO
  ): Promise<Coordinator> {
    const coordinator = await this.prisma.coordinator.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        registration: data.registration,
        role: data.role,
      },
    });

    return coordinator;
  }

  async update(
    id: string,
    data: UpdateCoordinatorDTO
  ): Promise<Coordinator> {
    const updatedCoordinator =
      await this.prisma.coordinator.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          registration: data.registration,
        },
      });

    return updatedCoordinator;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.coordinator.delete({
      where: { id },
    });
  }
}

export default new CoordinatorRepository(prismaService);
