import express from "express";
import auth from "../../middlewares/auth";
import { QueueController } from "./Queue.controller";

const router = express.Router();

router.get("/", auth(), QueueController.getQueue);

router.post("/assign", auth(), QueueController.assignFromQueue);

export const QueueRoutes = router;