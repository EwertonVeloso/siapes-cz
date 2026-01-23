import { hash } from "bcryptjs";
import CoordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";
import type { CreateCoordinatorDTO } from "../../../schemas/CoordinatorSchema.ts";

class RegisterCoordinatorUseCase {
  async execute(data: CreateCoordinatorDTO) {
    const emailAlreadyExists = await CoordinatorRepository.findByEmail(data.email);

    if (emailAlreadyExists) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    const rAlreadyExists =
      await CoordinatorRepository.findByR(
        data.registration
      );

    if (rAlreadyExists) {
      throw new AppError(
        "Registro já cadastrado.",
        409
      );
    }

    const passwordHash = await hash(data.password, 8);

    const coordinatorCreated =
      await CoordinatorRepository.create({
        ...data,
        password: passwordHash,
      });

    const { password, ...safeCoordinator } =
      coordinatorCreated;

    return {
      status: 201,
      body: safeCoordinator,
    };
  }
}

export default new RegisterCoordinatorUseCase();
