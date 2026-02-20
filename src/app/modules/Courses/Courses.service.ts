import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginations";
import {
  ICourse,
  ICourseFilterRequest,
  updateICourse,
} from "./Courses.interface";

const createIntoDb = async (
  data: ICourse,
  instructorId: string,
  thumbnailUrl: string,
  categoryId: string,
) => {
  if (!instructorId) throw new ApiError(400, "Missing instructorId");
  if (!categoryId) throw new ApiError(400, "Missing categoryId");

  const instructor = await prisma.user.findUnique({
    where: { id: instructorId },
  });
  if (!instructor) throw new ApiError(404, "Instructor not found");
  if (instructor.role !== "INSTRUCTOR")
    throw new ApiError(403, "Only instructors can create courses");

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw new ApiError(404, "Category not found");

  const course = await prisma.courses.create({
    data: {
      ...data,
      instructorId,
      thumbnailUrl,
      categoryId,
    },
    include: {
      user: { select: { id: true, username: true } },
      category: { select: { id: true, name: true } },
    },
  });

  return course;
};

const getListFromDb = async (
  userId: string,
  options: IPaginationOptions,
  params: ICourseFilterRequest & { minPrice?: number; maxPrice?: number },
  instructorId?: string,
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = params;

  const andConditions: Prisma.CoursesWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { category: { name: { contains: searchTerm, mode: "insensitive" } } },
      ],
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    andConditions.push({
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: (filterData as any)[key],
      })),
    });
  }

  andConditions.push({ activeStatus: "ACTIVE" });

  if (instructorId) andConditions.push({ instructorId });

  const whereConditions: Prisma.CoursesWhereInput = { AND: andConditions };

  const result = await prisma.courses.findMany({
    where: whereConditions,
    include: {
      user: { select: { id: true, username: true } },
      category: { select: { id: true, name: true } },
      Enrollment: { where: { studentId: userId }, select: { id: true } },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  const coursesWithBuyStatus = result.map((course) => ({
    ...course,
    isBuy: course.Enrollment.length > 0,
  }));

  const total = await prisma.courses.count({ where: whereConditions });

  return { meta: { page, limit, total }, data: coursesWithBuyStatus };
};

const getInActiveListFromDb = async (
  options: IPaginationOptions,
  params: ICourseFilterRequest & { minPrice?: number; maxPrice?: number },
  instructorId?: string,
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = params;

  const andConditions: Prisma.CoursesWhereInput[] = [];

  // 🔍 Search by course name and category name
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  // 💵 Filter by min and max price
  if (minPrice !== undefined || maxPrice !== undefined) {
    andConditions.push({
      price: {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      },
    });
  }

  // 🧩 Additional filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // ✅ Always filter only ACTIVE courses
  andConditions.push({
    activeStatus: "INACTIVE",
  });

  // 🧑‍🏫 Filter by teacherId
  if (instructorId) {
    andConditions.push({
      instructorId,
    });
  }

  // Final WHERE
  const whereConditions: Prisma.CoursesWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.courses.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      category: {
        include: {
          // subcategories: {
          //   include: {
          //     subcategories2: true,
          //   },
          // },
        },
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  const total = await prisma.courses.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getTopReviewedCourses = async (limit: number = 5, userId: string) => {
  const topCourseRatings = await prisma.review.groupBy({
    by: ["courseId"],
    _avg: { rating: true },
    orderBy: { _avg: { rating: "desc" } },
    take: limit,
  });

  const courseIds = topCourseRatings.map((item) => item.courseId);
  if (courseIds.length === 0) return [];

  const courses = await prisma.courses.findMany({
    where: { id: { in: courseIds }, activeStatus: "ACTIVE" },
    include: {
      Enrollment: { where: { studentId: userId }, select: { id: true } },
      review: true,
      user: { select: { id: true, username: true } },
      category: { select: { id: true, name: true } },
    },
  });

  const ratingMap = new Map(
    topCourseRatings.map((r) => [r.courseId, r._avg.rating]),
  );
  return courses
    .map((course) => ({
      ...course,
      isBuy: course.Enrollment.length > 0,
      avgRating: ratingMap.get(course.id) ?? 0,
    }))
    .sort((a, b) => b.avgRating - a.avgRating);
};

const getByIdFromDb = async (id: string, userId: string) => {
  const course = await prisma.courses.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, username: true } },
      category: { select: { id: true, name: true } },
    },
  });
  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

const getByInActiveIdFromDb = async (id: string) => {
  const course = await prisma.courses.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, username: true } },
      category: { select: { id: true, name: true } },
    },
  });
  if (!course || course.activeStatus !== "INACTIVE")
    throw new ApiError(404, "Inactive course not found");
  return course;
};

/**
 * =========================
 * DASHBOARD FUNCTIONS
 * =========================
 */
const getAllDashboardCount = async () => {
  const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
  const totalInstructors = await prisma.user.count({
    where: { role: "INSTRUCTOR" },
  });
  const totalCourses = await prisma.courses.count();
  const totalEnrollments = await prisma.enrollment.count();
  return { totalStudents, totalInstructors, totalCourses, totalEnrollments };
};

const getTotalCoursesCount = async (instructorId: string) => {
  const totalCourses = await prisma.courses.count({ where: { instructorId } });
  return totalCourses;
};

const getStudentVideoProgress = async (studentId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId },
    include: { course: { select: { id: true } } },
  });

  const progressList = [];
  for (const enroll of enrollments) {
    const totalVideos = await prisma.videos.count({
      where: { courseId: enroll.course.id },
    });
    const watchedVideos = await prisma.watchHistory.count({
      where: { userId: studentId, video: { courseId: enroll.course.id } },
    });
    const progress = totalVideos ? (watchedVideos / totalVideos) * 100 : 0;
    progressList.push({
      courseId: enroll.course.id,
      progress: Number(progress.toFixed(2)),
    });
  }

  return progressList;
};

const getTotalSellCount = async (instructorId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { course: { instructorId } },
  });
  return enrollments.length;
};

/**
 * =========================
 * RECOMMENDED COURSES
 * =========================
 */
const recommendCourses = async (courseId: string) => {
  return await prisma.courses.update({
    where: { id: courseId },
    data: { recommended: true },
  });
};

const getRecommendedCourses = async () => {
  return await prisma.courses.findMany({
    where: { recommended: true, activeStatus: "ACTIVE" },
    include: { user: { select: { username: true, email: true } } },
  });
};

/**
 * =========================
 * UPDATE COURSE
 * =========================
 */
const updateIntoDb = async (
  id: string,
  data: updateICourse,
  instructorId: string,
  thumbnailUrl?: string,
) => {
  const isExitsCourse = await prisma.courses.findFirst({
    where: { id, instructorId },
  });
  if (!isExitsCourse) {
    throw new ApiError(404, "Course not found");
  }

  const updateData: any = { ...data };

  if (thumbnailUrl !== undefined) {
    updateData.thumbnailUrl = thumbnailUrl;
  }

  // Ensure categoryId (or any optional field) is only set if not undefined
  if (data.categoryId !== undefined) {
    updateData.categoryId = data.categoryId;
  }

  const updatedCourse = await prisma.courses.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return updatedCourse;
};

/**
 * =========================
 * DELETE COURSE
 * =========================
 */
const deleteItemFromDb = async (id: string) => {
  const course = await prisma.courses.findUnique({ where: { id } });
  if (!course) throw new ApiError(404, "Course not found");
  await prisma.courses.delete({ where: { id } });
  return { message: "Course deleted successfully" };
};

/**
 * =========================
 * MY PURCHASED COURSES
 * =========================
 */
const getMyPurchasedCourses = async (studentId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: {
        include: {
          user: { select: { id: true, username: true } },
          category: { select: { id: true, name: true } },
        },
      },
    },
  });
  return enrollments.map((e) => e.course);
};

/**
 * =========================
 * BUY COURSE
 * =========================
 */
const buyCourse = async (
  studentId: string,
  courseId: string,
  paymentId?: string,
) => {
  const course = await prisma.courses.findUnique({ where: { id: courseId } });
  if (!course) throw new ApiError(404, "Course not found");

  const alreadyEnrolled = await prisma.enrollment.findFirst({
    where: { courseId, studentId },
  });
  if (alreadyEnrolled) throw new ApiError(400, "Course already purchased");

  const enrollment = await prisma.enrollment.create({
    data: { courseId, studentId, paymentId },
  });
  return enrollment;
};

export const CoursesService = {
  createIntoDb,
  getListFromDb,
  getInActiveListFromDb,
  getTopReviewedCourses,
  getByIdFromDb,
  getByInActiveIdFromDb,
  // dashboard
  getAllDashboardCount,
  getTotalCoursesCount,
  getStudentVideoProgress,
  getTotalSellCount,
  // recommended courses
  recommendCourses,
  getRecommendedCourses,
  // update and delete
  updateIntoDb,
  deleteItemFromDb,
  // my courses
  getMyPurchasedCourses,
  buyCourse,
};
