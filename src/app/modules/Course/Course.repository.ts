// import prisma from "../../../shared/prisma";

// export const CourseRepository = {
//   create(data: any) {
//     return prisma.course.create({ data });
//   },

//   findById(id: string) {
//     return prisma.course.findUnique({
//       where: { id },
//     });
//   },

//   update(id: string, data: any) {
//     return prisma.course.update({
//       where: { id },
//       data,
//     });
//   },

//   softDelete(id: string) {
//     return prisma.course.update({
//       where: { id },
//       data: { isDeleted: true, status: "ARCHIVED" },
//     });
//   },

//   findAll() {
//     return prisma.course.findMany({
//       where: { isDeleted: false },
//       include: { instructor: true },
//     });
//   },
// };
