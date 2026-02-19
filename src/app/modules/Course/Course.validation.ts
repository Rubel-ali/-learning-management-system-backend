import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10),
  price: z.number().min(0),
  thumbnail: z.string(),
});

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().min(0).optional(),
  thumbnail: z.string().optional(),
});

export const CourseValidation = {
  createSchema,
  updateSchema,
};
