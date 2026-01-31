import type { Request, Response, NextFunction } from "express";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Permissions = {
  [role: string]: {
    [resource: string]: Method[];
  };
};


const PERMISSIONS: Permissions = {
  ADMIN: {
    employee: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    coordinator: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    request: ["GET", "DELETE"], 
    profile: ["GET", "PATCH"], 
  },
  
  MANAGER: {
    //Pode deletar apenas solicitações em PENDING ou REFUSED
    request: ["GET", "PATCH", "DELETE"],
    profile: ["GET", "PATCH"],
  },
  
  COORDINATOR: {
    request: ["GET", "POST"],
    profile: ["GET", "PATCH"],
  },
};

export function ensureAccessControl(req: Request, res: Response, next: NextFunction) {
  const userRole = req.user.role; 
  const method = req.method as Method;
  
  let resource;

  if (req.baseUrl) {
    const parts = req.baseUrl.split("/").filter((part) => part);
    if (parts.length > 0) {
      resource = parts[parts.length - 1]; 
    }
  }

  if (!resource) {
    const pathParts = req.path.split("/").filter((part) => part);
    resource = pathParts[0];
  }

  if (!resource) {
    return res.status(403).json({ message: "Recurso não identificado." });
  }

  //Verifica se o Cargo existe nas Permissões
  const rolePermissions = PERMISSIONS[userRole];
  if (!rolePermissions) {
    return res.status(403).json({ message: "O cargo não possui permissões definidas." });
  }

  //Verifica se o Cargo tem acesso ao Recurso
  const allowedMethods = rolePermissions[resource];
  if (!allowedMethods) {
    return res.status(403).json({ 
      message: `Acesso negado ao recurso: ${resource}` 
    });
  }

  //Verifica se o Método HTTP é permitido
  if (!allowedMethods.includes(method)) {
    return res.status(403).json({ 
      message: `O cargo ${userRole} não tem permissão para realizar ${method} em ${resource}.` 
    });
  }

  return next();
}