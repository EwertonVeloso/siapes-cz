import refreshTokenRepository from "../../../databases/prismaRepository/refreshTokenRepository.ts";

class LogoutUseCase {
  async execute(refresh_token: string) {
    await refreshTokenRepository.delete(refresh_token);
    
    return;
  }
}

export default new LogoutUseCase();