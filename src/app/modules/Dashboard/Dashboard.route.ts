import express from "express";
import auth from "../../middlewares/auth";
import { DashboardController } from "./Dashboard.controller";

const router = express.Router();

router.get("/", auth(), DashboardController.getDashboard);

export const DashboardRoutes = router;