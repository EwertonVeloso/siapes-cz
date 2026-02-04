import { hash } from "bcryptjs";
import axios from "axios"; 
import CoordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";
import GraphRepository from "../../../databases/neo4j/graphRepository.ts"
import { AppError } from "../../../errors/appErrors.ts";
import type { CreateCoordinatorDTO } from "../../../schemas/CoordinatorSchema.ts";

const INSTITUTION_API_URL = process.env.INSTITUTION_API_URL || "http://localhost:3333/institution";

class RegisterCoordinatorUseCase {
  async execute(data: CreateCoordinatorDTO) {
  
    let institutionName = "";
    
    try {
      const response = await axios.get(`${INSTITUTION_API_URL}/${data.institutionId}`);
      institutionName = response.data.name; 
    } catch (error) {
      throw new AppError("Instituição não encontrada ou API indisponível.", 404);
    }

    const emailAlreadyExists = await CoordinatorRepository.findByEmail(data.email);

    if (emailAlreadyExists) {
      throw new AppError("E-mail já cadastrado.", 409);
    }

    const rAlreadyExists = await CoordinatorRepository.findByR(data.registration);

    if (rAlreadyExists) {
      throw new AppError("Registro já cadastrado.", 409);
    }

    const passwordHash = await hash(data.password, 8);

    const coordinatorCreated = await CoordinatorRepository.create({
      ...data,
      password: passwordHash,
    });

    try {
      await GraphRepository.linkCoordinatorToInstitution(
        coordinatorCreated.id,  
        data.institutionId,     
        institutionName,  
        coordinatorCreated.name      
      );
      console.log("Grafo atualizado com sucesso");
    } catch (error) {
      console.error("Falha ao atualizar Neo4j:", error);
      
    }

    const { password, ...safeCoordinator } = coordinatorCreated;

    return {
      status: 201,
      body: safeCoordinator,
    };
  }
}

export default new RegisterCoordinatorUseCase();