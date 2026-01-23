import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class getRequestByIdUseCase {
  async execute(id: string) {
    const request = await requestRepository.findById(id);

    if (!request) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    return {
      status: 200,
      body: request
    };
  }
}

export default new getRequestByIdUseCase();