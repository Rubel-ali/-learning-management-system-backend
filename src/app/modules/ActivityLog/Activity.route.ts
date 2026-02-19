import express from "express";
import auth from "../../middlewares/auth";
import { ActivityController } from "./Activity.Controller";

const router = express.Router();

router.get("/", auth(), ActivityController.getLatestLogs);

export const ActivityRoutes = router;
