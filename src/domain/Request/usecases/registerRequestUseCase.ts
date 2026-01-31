import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import type { CreateRequestDTO } from "../../../schemas/RequestSchema.ts";
import { AppError } from "../../../errors/appErrors.ts";

class registerRequestUseCase {
  
  async execute(data: CreateRequestDTO) {
   
    const requestAlreadyExists = await requestRepository.findByProtocol(data.protocol);

    if (requestAlreadyExists) {
      throw new AppError("Solicitação já cadastrada.", 409);
    }
    
    const newRequest = await requestRepository.create(data);

    return {
      status: 201,
      body: newRequest
    };
  }
}

export default new registerRequestUseCase();