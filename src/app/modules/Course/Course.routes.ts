// import express from "express";
// import auth from "../../middlewares/auth";
// import validateRequest from "../../middlewares/validateRequest";
// import { CourseController } from "./Course.controller";
// import { CourseValidation } from "./Course.validation";
// import { fileUploader } from "../../../helpars/fileUploader";

// const router = express.Router();

// router.post(
//   "/",
//   fileUploader.uploadCourseImage,
//   auth(),
//   validateRequest(CourseValidation.createSchema),
//   CourseController.createCourse,
// );

// router.get("/", auth(), CourseController.getCourseList);

// router.get("/:id", auth(), CourseController.getCourseById);

// router.put(
//   "/:id",
//   auth(),
//   validateRequest(CourseValidation.updateSchema),
//   CourseController.updateCourse,
// );

// router.delete("/:id", auth(), CourseController.deleteCourse);

// export const CourseRoutes = router;
