import express from "express";
import auth from "../../middlewares/auth";
import { ServiceController } from "./Service.controller";

const router = express.Router();

router.post("/", auth(), ServiceController.createService);

router.get("/", auth(), ServiceController.getAllServices);

router.put("/:id", auth(), ServiceController.updateService);

router.delete("/:id", auth(), ServiceController.deleteService);

export const servicefRoutes = router;
