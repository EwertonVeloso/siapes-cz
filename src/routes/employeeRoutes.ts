import express  from "express";
import  RegisterEmployeeController  from "../controllers/Employee/registerEmployeeController.ts";

const employeeRoutes = express.Router();

employeeRoutes.post("/", RegisterEmployeeController.handle);

export default employeeRoutes;