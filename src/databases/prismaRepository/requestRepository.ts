import { prismaService as prisma } from '../../service/prisma.ts';
import type { UpdateRequestDTO } from '../../schemas/RequestSchema.ts';
import type { CreateRequestDTO } from '../../schemas/RequestSchema.ts';

class RequestRepository {

  async delete(id: string) {
    await prisma.request.delete({
      where: { id }
    });
  }

  async findAll() {
    return await prisma.request.findMany({
      include: {
        archives: true 
      }
    });
  }

  async findById(id: string) {
    return await prisma.request.findUnique({
      where: { id },
      include: { archives: true }
    });
  }

  async create(data: CreateRequestDTO) {
    return await prisma.request.create({
      data: data as any,
      include: { archives: true }
    });
  }

  async update(id: string, data: UpdateRequestDTO) {
    return await prisma.request.update({
      where: { id },
      data,
    });
  }

  async createArchive(data: { name: string; url: string; request_id: string }) {
    return await prisma.archive.create({
      data
    });
  }

}

export default new RequestRepository();