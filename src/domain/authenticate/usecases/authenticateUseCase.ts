import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import dayjs from "dayjs";
import { AppError } from "../../../errors/appErrors.ts";

import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";
import coordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts"; 
import refreshTokenRepository from "../../../databases/prismaRepository/refreshTokenRepository.ts";

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
  active: boolean;
  type: "EMPLOYEE" | "COORDINATOR"; 
}

class AuthenticateUseCase {
  async execute({ email, password }: ParamsBody) {
    let authUser: IAuthUser | null = null;

    const employee = await employeeRepository.findByEmail(email);
    if (employee) {
      authUser = {
        ...employee,
        type: "EMPLOYEE"
      };
    }

    if (!authUser) {
      const coordinator = await coordinatorRepository.findByEmail(email);
      if (coordinator) {
         authUser = { ...coordinator, role: "COORDINATOR", type: "COORDINATOR", active: true }; 
      }
    }

    if (!authUser) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, authUser.password);
    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    if (!authUser.active) {
      throw new AppError("Acesso negado. Usuário inativo.", 401);
    }

    
    await refreshTokenRepository.deleteByUserId(authUser.id);

    const token = jwt.sign(
      { role: authUser.role }, 
      process.env.TOKEN_KEY!, 
      {
        subject: authUser.id,
        expiresIn: "15m", 
      }
    );

    const refreshTokenExpiresIn = dayjs().add(7, "days").unix();
    
    const refreshToken = await refreshTokenRepository.create({
      userId: authUser.id,
      userType: authUser.type, 
      expiresIn: refreshTokenExpiresIn
    });

    return { 
      status: 200, 
      body: { 
        token,
        refreshToken: refreshToken.id,
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