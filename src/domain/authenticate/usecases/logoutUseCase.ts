import refreshTokenRepository from "../../../databases/prismaRepository/refreshTokenRepository.ts";
import BlacklistService from "../../../service/blackListService.ts"

class LogoutUseCase {
  async execute(accessToken: string, refreshToken?: string) {
    
    if (accessToken) {
        await BlacklistService.addToken(accessToken);
    }

    if (refreshToken) {
        await refreshTokenRepository.delete(refreshToken); 
    }
  }
}

export default new LogoutUseCase();