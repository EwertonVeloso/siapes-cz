import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.ts";
import ChangePasswordController from "../controllers/authentication/changePasswordController.ts"

const profileRoutes = Router();

profileRoutes.use(verifyToken);

profileRoutes.patch("/password", ChangePasswordController.handle);

export default profileRoutes;