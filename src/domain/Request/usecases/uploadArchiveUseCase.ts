import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import { AppError } from "../../../errors/appErrors.ts";

class uploadArchiveUseCase {
  async execute(id: string, file: Express.Multer.File) {

    const requestExists = await requestRepository.findById(id);
    
    if (!requestExists) {
      throw new AppError("Solicitação não encontrada.", 404);
    }

    const archive = await requestRepository.createArchive({
      name: file.originalname,
      url: file.filename, 
      request_id: id
    });

    return {
      status: 201,
      body: archive
    };
  }
}

export default new uploadArchiveUseCase();