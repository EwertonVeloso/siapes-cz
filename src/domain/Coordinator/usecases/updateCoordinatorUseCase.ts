import { AppError } from "../../../errors/appErrors.ts";
import CoordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";
import type { UpdateCoordinatorDTO } from "../../../schemas/CoordinatorSchema.ts";

class UpdateCoordinatorUseCase {
  async execute(coordinatorId: string, data: UpdateCoordinatorDTO) {
    const coordinator = await CoordinatorRepository.findById(coordinatorId);

    if (!coordinator) {
      throw new AppError("Coordenador não encontrado.", 404);
    }

    if (data.email) {
      const emailAlreadyExists =
        await CoordinatorRepository.findByEmail(data.email);

      if(emailAlreadyExists && emailAlreadyExists.id !== coordinatorId) {
        throw new AppError("E-mail já cadastrado.", 409);
      }
    }

    if (data.registration) {
      const rAlreadyExists =
        await CoordinatorRepository.findByR(
          data.registration
        );

      if ( rAlreadyExists && rAlreadyExists.id !== coordinatorId) {
        throw new AppError("Registro já cadastrado.", 409);
      }
    }

    const updatedCoordinator =
      await CoordinatorRepository.update(
        coordinatorId,
        data
      );

    const { password, ...safeUpdatedCoordinator } =
      updatedCoordinator;

    return {
      status: 200,
      body: safeUpdatedCoordinator,
    };
  }
}

export default new UpdateCoordinatorUseCase();
