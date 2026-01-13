import { Router } from "express";
import AuthenticateController from "../controllers/authentication/authenticateController.ts";

const authRoutes = Router();

authRoutes.post("/login", AuthenticateController.handle);

export default authRoutes;