import { redisClient } from "../config/redisClient.ts";

class BlacklistService {
  private readonly PREFIX = "blacklist_token:";
  
  private readonly EXPIRATION_TIME = 60 * 20; 

  async addToken(token: string): Promise<void> {
    const key = `${this.PREFIX}${token}`;
    await redisClient.set(key, "blocked", "EX", this.EXPIRATION_TIME);
  }

  async hasToken(token: string): Promise<boolean> {
    const key = `${this.PREFIX}${token}`;
    const result = await redisClient.get(key);
    return result === "blocked";
  }
}

export default new BlacklistService();