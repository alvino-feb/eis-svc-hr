import { Router } from "express";

// employee
import employeeInformation from "../modules/employee/employee-information/employee.information.routes.js";

const router = Router();

// employee
router.use(
  "/employee", 
  employeeInformation
);


export default router;