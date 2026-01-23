import requestRepository from "../../../databases/prismaRepository/requestRepository.ts";
import { RequestEntity } from "../entity/Request.ts"; 

class registerRequestUseCase {
  
  async execute(data: any) {
   
    const request = new RequestEntity({
      title: data.title,
      description: data.description,
      course: data.course,
      students_number: data.students_number,
      protocol: `REQ-${Date.now()}`, 
      status: 'PENDING'              
    });

    const newRequest = await requestRepository.create(request);

    return {
      status: 201,
      body: newRequest
    };
  }
}

export default new registerRequestUseCase();