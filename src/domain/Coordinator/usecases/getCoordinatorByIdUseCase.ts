import CoordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class GetCoordinatorByIdUseCase {
  async execute(id: string) {
    const coordinator = await CoordinatorRepository.findById(id);

    if (!coordinator) {
      throw new AppError("Coordenador não encontrado.", 404);
    }

    return {
      status: 200,
      body: coordinator,
    };
  }
}

export default new GetCoordinatorByIdUseCase();
