// import { z } from "zod";

// const createAppointmentSchema = z
//   .object({
//     customerName: z.string().min(1, "Customer name is required"),

//     serviceId: z.string().min(1, "Service ID is required"),

//     staffId: z.string().min(1, "Staff ID must be a valid string").optional(),

//     appointmentDate: z
//       .string()
//       .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

//     startTime: z
//       .string()
//       .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Start time must be HH:mm"),

//     endTime: z
//       .string()
//       .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "End time must be HH:mm"),
//   })
//   .refine((data) => data.startTime < data.endTime, {
//     message: "Start time must be before end time",
//     path: ["endTime"],
//   });

// export const AppointmentValidation = {
//   createAppointmentSchema,
// };
