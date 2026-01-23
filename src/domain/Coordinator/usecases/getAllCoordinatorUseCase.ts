import CoordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";

class GetAllCoordinatorUseCase {
  async execute() {
    const coordinators = await CoordinatorRepository.findAll();
    return {
      status: 200,
      body: coordinators,
    };
  }
}

export default new GetAllCoordinatorUseCase();
