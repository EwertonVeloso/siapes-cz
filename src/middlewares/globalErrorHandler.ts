import type { Request, Response, NextFunction } from "express";
import { AppErrorsZod } from "../errors/zodErrors.ts" 

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  
  if (err instanceof AppErrorsZod) {
    return res.status(err.statusCode).json({
      status: "error",
      message: "Erro de validação",
      errors: err.issues 
    });
  }

  return res.status(500).json({ status: "error", message: "Internal Server Error" });
}