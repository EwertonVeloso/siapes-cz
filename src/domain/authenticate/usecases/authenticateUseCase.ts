import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../../errors/appErrors.ts"

import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";

type ParamsBody = {
  email: string;
  password: string;
};

interface IAuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

class AuthenticateUseCase {
  async execute({ email, password }: ParamsBody) {
    let authUser: IAuthUser | null = null;

    const employee = await employeeRepository.findByEmail(email);

    if (employee) {
      authUser = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        password: employee.password,
        role: employee.role 
      };
    } 
    
    if (!authUser) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, authUser.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const token = jwt.sign(
      { role: authUser.role }, 
      process.env.TOKEN_KEY!, 
      {
        subject: authUser.id,
        expiresIn: "1d",
      }
    );

    return { 
      status: 200, 
      body: { 
        token,
        user: {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          role: authUser.role
        }
      } 
    };
  }
}

export default new AuthenticateUseCase();