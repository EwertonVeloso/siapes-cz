import CoordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class DeleteCoordinatorUseCase {
  async execute(id: string) {
    const coordinator = await CoordinatorRepository.findById(id);

    if (!coordinator) {
      throw new AppError("Coordenador não encontrado.", 404);
    }

    await CoordinatorRepository.delete(id);

    return {
      status: 200,
      body: {
        message: "Coordenador deletado com sucesso.",
      },
    };
  }
}

export default new DeleteCoordinatorUseCase();