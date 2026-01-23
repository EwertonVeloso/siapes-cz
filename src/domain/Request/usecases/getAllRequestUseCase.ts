import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";

class getAllRequestUseCase {
  async execute() {
    const requests = await requestRepository.findAll();

    return {
      status: 200,
      body: requests
    };
  }
}

export default new getAllRequestUseCase();