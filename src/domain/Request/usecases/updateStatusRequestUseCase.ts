import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class updateStatusRequestUseCase {

  async execute(id: string, status: string) {
    
    const requestExists = await requestRepository.findById(id);
    
    if (!requestExists) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    const updatedRequest = await requestRepository.update(id, { status } as any);

    return {
      status: 200,
      body: {
        message: `Status atualizado para ${status} com sucesso.`,
        data: updatedRequest
      }
    };
  }
}

export default new updateStatusRequestUseCase();