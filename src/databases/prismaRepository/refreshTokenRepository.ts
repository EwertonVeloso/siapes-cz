import { ca } from "zod/locales";
import { prismaService, PrismaClient} from "../../service/prisma.ts";


interface ICreateRefreshTokenDTO {
  userId: string;
  userType: string;
  expiresIn: number;
}

class RefreshTokenRepository {
    private prisma: PrismaClient;
    
    constructor(prismaService: PrismaClient) {
        this.prisma = prismaService
    }
   
  async create({ userId, userType, expiresIn }: ICreateRefreshTokenDTO) {
    return this.prisma.refreshToken.create({
      data: { userId, userType, expiresIn }
    });
  }

  async findById(id: string) {
    return this.prisma.refreshToken.findFirst({ where: { id } });
  }

  //Deleta um token específico, logout em um único disposítivo.
  async delete(id: string) {
    await this.prisma.refreshToken.delete({ where: { id } });
  }

  // Deleta todos os tokens (Logout Geral / Troca de Senha)
  async deleteByUserId(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }
}

export default new RefreshTokenRepository(prismaService);