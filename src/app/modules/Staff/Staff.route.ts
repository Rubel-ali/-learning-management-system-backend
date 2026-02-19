import express from "express";
import { StaffController } from "./Staff.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(), StaffController.createStaff);

router.get("/", auth(), StaffController.getAllStaff);

router.put("/:id", auth(), StaffController.updateStaff);

router.delete("/:id", auth(), StaffController.deleteStaff);

router.put("/status/:id", auth(), StaffController.updateStaffStatus);


export const staffRoutes = router;
