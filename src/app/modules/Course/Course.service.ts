// import ApiError from "../../../errors/ApiErrors";
// import { fileUploader } from "../../../helpars/fileUploader";
// import prisma from "../../../shared/prisma";
// import httpStatus from "http-status";
// import { CourseRepository } from "./Course.repository";

// const createIntoDb = async (
//   data: any,
//   instructorId: string,
//   file?: Express.Multer.File,
// ) => {
//   if (!instructorId)
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");

//   // ✅ Instructor validation
//   const instructor = await prisma.user.findUnique({
//     where: { id: instructorId },
//   });

//   if (!instructor)
//     throw new ApiError(httpStatus.NOT_FOUND, "Instructor not found");

//   if (instructor.role !== "INSTRUCTOR")
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       "Only instructors can create courses",
//     );

//   // ✅ File upload
//   let thumbnailUrl: string | undefined;

//   if (file) {
//     const uploadResult = await fileUploader.uploadToCloudinary(file);
//     thumbnailUrl = uploadResult?.Location;

//     if (!thumbnailUrl)
//       throw new ApiError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         "Failed to upload thumbnail",
//       );
//   }

//   // ✅ Create using Repository
//   const result = await CourseRepository.create({
//     ...data,
//     instructorId,
//     ...(thumbnailUrl ? { thumbnailUrl } : {}),
//   });

//   return result;
// };

// const getListFromDb = async () => {
//   return CourseRepository.findAll();
// };

// const getByIdFromDb = async (id: string) => {
//   const result = await CourseRepository.findById(id);

//   if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");

//   return result;
// };

// const updateIntoDb = async (
//   id: string,
//   data: any,
//   instructorId: string,
//   file?: Express.Multer.File,
// ) => {
//   const course = await CourseRepository.findById(id);

//   if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");

//   if (course.instructorId !== instructorId)
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       "You can only update your own courses",
//     );

//   let thumbnailUrl = course.thumbnailUrl;

//   if (file) {
//     const uploadResult = await fileUploader.uploadToCloudinary(file);
//     thumbnailUrl = uploadResult?.Location;

//     if (!thumbnailUrl)
//       throw new ApiError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         "Failed to upload thumbnail",
//       );
//   }

//   const updated = await CourseRepository.update(id, {
//     ...data,
//     ...(thumbnailUrl ? { thumbnailUrl } : {}),
//   });

//   return updated;
// };

// const deleteItemFromDb = async (id: string, instructorId: string) => {
//   const course = await CourseRepository.findById(id);

//   if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");

//   if (course.instructorId !== instructorId)
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       "You can only delete your own courses",
//     );

//   // 👉 Soft delete
//   return CourseRepository.softDelete(id);
// };

// export const CourseService = {
//   createIntoDb,
//   getListFromDb,
//   getByIdFromDb,
//   updateIntoDb,
//   deleteItemFromDb,
// };
