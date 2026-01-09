import express  from "express";
import  RegisterEmployeeController  from "../controllers/Employee/registerEmployeeController.ts";
import UpdateEmployeeController  from "../controllers/Employee/updateEmployeeController.ts";
import GetAllEmployeesController  from "../controllers/Employee/getAllEmployeeController.ts";

const employeeRoutes = express.Router();

employeeRoutes.post("/", RegisterEmployeeController.handle);
employeeRoutes.put("/:id", UpdateEmployeeController.handle);
employeeRoutes.get("/", GetAllEmployeesController.handle);
// employeeRoutes.get("/:id", GetEmployeeByIdController.handle);
// employeeRoutes.delete("/:id", DeleteEmployeeController.handle);
// employeeRoutes.patch("/:id/status", StatusEmployeeController.handle);
// employeeRoutes.patch("/id/role", RoleEmployeeController.handle);


export default employeeRoutes;