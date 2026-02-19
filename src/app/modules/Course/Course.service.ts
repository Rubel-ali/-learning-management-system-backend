import ApiError from "../../../errors/ApiErrors";
import { fileUploader } from "../../../helpars/fileUploader";
import prisma from "../../../shared/prisma";
import httpStatus from "http-status";

const allowedLevels = ["1", "2", "3", "4", "5", "Beginner", "Intermediate", "Pro"];

const createIntoDb = async (data: any, instructorId: string, file?: Express.Multer.File) => {
  // Instructor validation
  const instructor = await prisma.user.findUnique({ where: { id: instructorId } });
  if (!instructor) throw new ApiError(httpStatus.NOT_FOUND, "Instructor not found");
  if (instructor.role !== "INSTRUCTOR")
    throw new ApiError(httpStatus.FORBIDDEN, "Only instructors can create courses");

  // Level validation
  if (!data.level || !allowedLevels.includes(data.level)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid course level");
  }

  // File upload
  let thumbnailUrl: string | undefined;
  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    thumbnailUrl = uploadResult?.Location;
    if (!thumbnailUrl) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to upload thumbnail");
  }

  const result = await prisma.course.create({
    data: {
      ...data,
      instructorId,
      ...(thumbnailUrl ? { thumbnailUrl } : {}),
    },
  });

  return result;
};

const getListFromDb = async () => {
  return prisma.course.findMany({ orderBy: { createdAt: "desc" } });
};

const getByIdFromDb = async (id: string) => {
  const result = await prisma.course.findUnique({ where: { id } });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  return result;
};

const updateIntoDb = async (id: string, data: any, instructorId: string, file?: Express.Multer.File) => {
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");

  if (course.instructorId !== instructorId)
    throw new ApiError(httpStatus.FORBIDDEN, "You can only update your own courses");

  let thumbnailUrl = course.thumbnailUrl;
  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    thumbnailUrl = uploadResult?.Location;
    if (!thumbnailUrl) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to upload thumbnail");
  }

  const updated = await prisma.course.update({
    where: { id },
    data: {
      ...data,
      ...(thumbnailUrl ? { thumbnailUrl } : {}),
    },
  });

  return updated;
};

const deleteItemFromDb = async (id: string, instructorId: string) => {
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");

  if (course.instructorId !== instructorId)
    throw new ApiError(httpStatus.FORBIDDEN, "You can only delete your own courses");

  const deletedItem = await prisma.course.delete({ where: { id } });
  return deletedItem;
};

export const CourseService = {
  createIntoDb,
  getListFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteItemFromDb,
};
