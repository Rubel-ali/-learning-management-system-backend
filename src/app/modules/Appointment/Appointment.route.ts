import express from "express";
import auth from "../../middlewares/auth";
import { AppointmentController } from "./Appointment.Controller";

const router = express.Router();

router.post("/",  auth(), AppointmentController.createAppointment);

router.get("/", auth(), AppointmentController.getAllAppointments);

router.post("/assign-from-queue", auth(), AppointmentController.assignAppointmentFromQueue);

router.put("/:id", auth(), AppointmentController.updateAppointment);

router.delete("/:id", auth(), AppointmentController.deleteAppointment);


export const AppointmentRoutes = router;
