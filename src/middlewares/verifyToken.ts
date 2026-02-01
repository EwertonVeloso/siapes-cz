import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import BlacklistService from "../service/blackListService.ts";

interface ITokenPayload {
  sub: string;
  role: string;
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    res.status(401).json({ message: "Erro no formato do Token." });
    return;
  }

  const [scheme, token] = parts as [string, string];

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ message: "Token mal formatado." });
    return;
  }

  try {
    const isBlacklisted = await BlacklistService.hasToken(token);

    if (isBlacklisted) {
      res.status(401).json({ message: "Sessão inválida ou finalizada." });
      return;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY!) as unknown as ITokenPayload;

    req.user = {
      id: decoded.sub, 
      role: decoded.role
    };

    return next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido ou expirado." });
    return;
  }
}