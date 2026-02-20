import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";

/**
 * CoursesRepository
 * -----------------
 * This layer handles ONLY direct database interactions.
 * Business logic should be in Service layer.
 */
export const CoursesRepository = {
  /**
   * Create a new course
   */
  create(data: Prisma.CoursesCreateInput) {
    return prisma.courses.create({ data });
  },

  /**
   * Find courses with filters, pagination, and relations
   */
  findMany(
    where: Prisma.CoursesWhereInput,
    skip: number,
    take: number,
    include: Prisma.CoursesInclude,
    orderBy: Prisma.CoursesOrderByWithRelationInput
  ) {
    return prisma.courses.findMany({
      where,
      skip,
      take,
      include,
      orderBy,
    });
  },

  /**
   * Count total courses based on filter
   */
  count(where: Prisma.CoursesWhereInput) {
    return prisma.courses.count({ where });
  },

  /**
   * Find a single course by ID
   */
  findById(id: string, include?: Prisma.CoursesInclude) {
    return prisma.courses.findUnique({ where: { id }, include });
  },

  /**
   * Update a course
   */
  update(id: string, data: Prisma.CoursesUpdateInput, include?: Prisma.CoursesInclude) {
    return prisma.courses.update({ where: { id }, data, include });
  },

  /**
   * Delete a course permanently
   */
  delete(id: string) {
    return prisma.courses.delete({ where: { id } });
  },
};
