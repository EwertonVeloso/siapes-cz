import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class updateRequestUseCase {
  async execute(id: string, data: any) {
  
    const requestExists = await requestRepository.findById(id);
    
    if (!requestExists) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    const updatedRequest = await requestRepository.update(id, data);

    return {
      status: 200,
      body: updatedRequest
    };
  }
}

export default new updateRequestUseCase();