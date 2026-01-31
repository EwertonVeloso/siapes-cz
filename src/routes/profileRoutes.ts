import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.ts";
import ChangePasswordController from "../controllers/authentication/changePasswordController.ts"
import { ensureAccessControl } from "../middlewares/ensureAccessControl.ts";
import logoutController from "../controllers/authentication/logoutController.ts";

const profileRoutes = Router();

profileRoutes.use(verifyToken);
profileRoutes.post("/logout", logoutController.handle);

profileRoutes.use(ensureAccessControl);

profileRoutes.patch("/password", ChangePasswordController.handle);

export default profileRoutes;