// import httpStatus from "http-status";
// import catchAsync from "../../../shared/catchAsync";
// import sendResponse from "../../../shared/sendResponse";
// import { Request, Response } from "express";
// import { CourseService } from "./Course.service";

// const createCourse = catchAsync(async (req: any, res: Response) => {
//   const instructorId = req?.user?.id;
//   const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//   const file = files?.file?.[0];

//   const courseData = JSON.parse(req.body.text || "{}");

//   const result = await CourseService.createIntoDb(courseData, instructorId!, file);
//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: "Course created successfully",
//     data: result,
//   });
// });

// const getCourseList = catchAsync(async (req: Request, res: Response) => {
//   const result = await CourseService.getListFromDb();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Course list retrieved successfully",
//     data: result,
//   });
// });

// const getCourseById = catchAsync(async (req: Request, res: Response) => {
//   const result = await CourseService.getByIdFromDb(req.params.id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Course details retrieved successfully",
//     data: result,
//   });
// });

// const updateCourse = catchAsync(async (req: any, res: Response) => {
//   const instructorId = req.user?.id;
//   const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//   const file = files?.file?.[0];

//   const courseData = JSON.parse(req.body.text || "{}");

//   const result = await CourseService.updateIntoDb(req.params.id, courseData, instructorId!, file);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Course updated successfully",
//     data: result,
//   });
// });

// const deleteCourse = catchAsync(async (req: any, res: Response) => {
//   const instructorId = req.user?.id;

//   const result = await CourseService.deleteItemFromDb(req.params.id, instructorId!);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Course deleted successfully",
//     data: result,
//   });
// });

// export const CourseController = {
//   createCourse,
//   getCourseList,
//   getCourseById,
//   updateCourse,
//   deleteCourse,
// };
