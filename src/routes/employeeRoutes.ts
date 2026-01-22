import express  from "express";
import  RegisterEmployeeController  from "../controllers/Employee/registerEmployeeController.ts";
import UpdateEmployeeController  from "../controllers/Employee/updateEmployeeController.ts";
import GetAllEmployeesController  from "../controllers/Employee/getAllEmployeeController.ts";
import DeleteEmployeeController  from "../controllers/Employee/deleteEmployeeController.ts";
import GetEmployeeByIdController from "../controllers/Employee/getEmployeeByIdController.ts";
import UpdateEmployeeStatusController from "../controllers/Employee/updateEmployeeStatusController.ts";
import RoleEmployeeController from "../controllers/Employee/updateEmployeeRoleController.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";


const employeeRoutes = express.Router();
employeeRoutes.use(verifyToken)

employeeRoutes.post("/", RegisterEmployeeController.handle);
employeeRoutes.put("/:id", UpdateEmployeeController.handle);
employeeRoutes.get("/", GetAllEmployeesController.handle);
employeeRoutes.delete("/:id", DeleteEmployeeController.handle);
employeeRoutes.get("/:id", GetEmployeeByIdController.handle);
employeeRoutes.patch("/:id/status", UpdateEmployeeStatusController.handle);
employeeRoutes.patch("/:id/role", RoleEmployeeController.handle);


export default employeeRoutes;