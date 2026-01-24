import { Router } from "express";
import AuthenticateController from "../controllers/authentication/authenticateController.ts";
import RefreshTokenController from "../controllers/authentication/refreshTokenController.ts";

const authRoutes = Router();

authRoutes.post("/login", AuthenticateController.handle);

authRoutes.post("/refresh-token", RefreshTokenController.handle);

export default authRoutes;