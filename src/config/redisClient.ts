import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST ,
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASS 
});

redisClient.on("connect", () => {
  console.log("Conectado ao Redis com sucesso!");
});

redisClient.on("error", (err) => {
  console.error("Erro na conexão com Redis:", err);
});

export { redisClient };