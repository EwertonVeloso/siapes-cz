import  requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class deleteRequestUseCase {
  async execute(id: string) {
    const requestExists = await requestRepository.findById(id);

    if (!requestExists) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    await requestRepository.delete(id);

    return {
      status: 200,
      body: {
        message: "Solicitação deletada com sucesso."
      }
    };
  }
}

export default new deleteRequestUseCase();