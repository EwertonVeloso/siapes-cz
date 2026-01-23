import express  from "express";
import RegisterCoordinatorController  from "../controllers/Coordinator/registerCoordinatorController.ts";
import UpdateCoordinatorController  from "../controllers/Coordinator/updateCoordinatorController.ts";
import GetAllCoordinatorController  from "../controllers/Coordinator/getAllCoordinatorController.ts";
import DeleteCoordinatorController  from "../controllers/Coordinator/deleteCoordinatorController.ts";
import GetCoordinatorByIdController from "../controllers/Coordinator/getCoordinatorByIdController.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";

const coordinatorRoutes = express.Router();
coordinatorRoutes.use(verifyToken)

coordinatorRoutes.post("/", RegisterCoordinatorController.handle);
coordinatorRoutes.get("/", GetAllCoordinatorController.handle);
coordinatorRoutes.get("/:id", GetCoordinatorByIdController.handle);
coordinatorRoutes.put("/:id", UpdateCoordinatorController.handle);
coordinatorRoutes.delete("/:id", DeleteCoordinatorController.handle);

export default coordinatorRoutes;