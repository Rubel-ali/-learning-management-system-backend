import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./Category.controller";

const router = express.Router();

router.post(
  "/",
  auth(),
  // validateRequest(CategoryValidation.createSchema),
  CategoryController.createCategoryForCourse
);
router.get("/categories", auth(), CategoryController.getCategoryList);

router.get("/:id", auth(), CategoryController.getCategoryById);


export const CategoryRoutes = router;
