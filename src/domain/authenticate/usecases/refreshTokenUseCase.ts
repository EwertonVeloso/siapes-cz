import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../../errors/appErrors.ts";

import refreshTokenRepository from "../../../databases/prismaRepository/refreshTokenRepository.ts";
import employeeRepository from "../../../databases/prismaRepository/employeeRepository.ts";
import coordinatorRepository from "../../../databases/prismaRepository/coordinatorRepository.ts";

class RefreshTokenUseCase {
  async execute(refresh_token_id: string) {
    const tokenExists = await refreshTokenRepository.findById(refresh_token_id);

    if (!tokenExists) {
      throw new AppError("Refresh Token inválido", 401);
    }

    await refreshTokenRepository.delete(refresh_token_id);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(tokenExists.expiresIn));
    if (refreshTokenExpired) {
      throw new AppError("Refresh Token expirado. Faça login novamente.", 401);
    }

    let currentRole = "";
    let isActive = false;

    if (tokenExists.userType === "EMPLOYEE") {
      const emp = await employeeRepository.findById(tokenExists.userId);
      if (emp) {
        currentRole = emp.role;
        isActive = emp.active;
      }
    } 

    else if (tokenExists.userType === "COORDINATOR") {
       const coord = await coordinatorRepository.findById(tokenExists.userId);
       if (coord) { currentRole = "COORDINATOR"; isActive = true; }
    }

    
    if (!currentRole || !isActive) {
      throw new AppError("Usuário não autorizado ou inativo.", 401);
    }

    const newAccessToken = jwt.sign(
      { role: currentRole }, 
      process.env.TOKEN_KEY!, 
      {
        subject: tokenExists.userId,
        expiresIn: "15m",
      }
    );

    const newRefreshTokenExpiresIn = dayjs().add(7, "days").unix();
    const newRefreshToken = await refreshTokenRepository.create({
      userId: tokenExists.userId,
      userType: tokenExists.userType,
      expiresIn: newRefreshTokenExpiresIn
    });

    return {
      token: newAccessToken,
      refreshToken: newRefreshToken.id
    };
  }
}

export default new RefreshTokenUseCase();