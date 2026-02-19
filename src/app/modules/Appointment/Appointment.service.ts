import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { ICreateAppointment, IAppointmentFilters } from "./Appointment.interface";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma } from "@prisma/client";
import { appointmentSearchAbleFields } from "./Appointment.constant";

// ⏱ Time conflict checker
const isConflict = (
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) => {
  return startA < endB && endA > startB;
};

// ➕ Create appointment
const createAppointment = async (payload: ICreateAppointment) => {
  const appointmentDate = new Date(payload.appointmentDate); // ✅ Prisma safe

  // ---------------- STAFF ASSIGNED ----------------
  if (payload.staffId) {
    const staff = await prisma.staff.findUnique({
      where: { id: payload.staffId },
    });
    if (!staff)
      throw new ApiError(httpStatus.NOT_FOUND, "Staff not found");

    if (staff.status !== "AVAILABLE") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `${staff.name} is currently on leave`,
      );
    }

    // Daily capacity
    const todayCount = await prisma.appointment.count({
      where: {
        staffId: payload.staffId,
        appointmentDate,
        status: { in: ["SCHEDULED", "COMPLETED"] },
      },
    });

    if (todayCount >= staff.dailyCapacity) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `${staff.name} already reached daily capacity`,
      );
    }

    // Time conflict
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        staffId: payload.staffId,
        appointmentDate,
      },
    });

    for (const ap of existingAppointments) {
      if (
        isConflict(ap.startTime, ap.endTime, payload.startTime, payload.endTime)
      ) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "This staff member already has an appointment at this time",
        );
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        customerName: payload.customerName,
        serviceId: payload.serviceId,
        staffId: payload.staffId,
        appointmentDate,
        startTime: payload.startTime,
        endTime: payload.endTime,
        status: "SCHEDULED",
      },
    });

    await prisma.activityLog.create({
      data: {
        message: `Appointment for "${payload.customerName}" scheduled with ${staff.name}`,
      },
    });

    return appointment;
  }

  // ---------------- WAITING QUEUE ----------------
  const appointment = await prisma.appointment.create({
    data: {
      customerName: payload.customerName,
      serviceId: payload.serviceId,
      appointmentDate,
      startTime: payload.startTime,
      endTime: payload.endTime,
      status: "WAITING",
    },
  });

  const position = await prisma.queue.count();
  await prisma.queue.create({
    data: {
      appointmentId: appointment.id,
      position: position + 1,
      
    },
  });

  await prisma.activityLog.create({
    data: {
      message: `Appointment for "${payload.customerName}" added to waiting queue`,
    },
  });

  return appointment;
};

// 📄 Get all appointments
const getAllAppointments = async (
  params: IAppointmentFilters,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AppointmentWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: appointmentSearchAbleFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AppointmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const data = await prisma.appointment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.appointment.count({
    where: whereConditions,
  });

  return {
    meta: { page, limit, total },
    data,
  };
};

// ❗ Assign appointment from queue
const assignAppointmentFromQueue = async (staffId: string) => {
  // 1️⃣ Validate staff
  const staff = await prisma.staff.findUnique({
    where: { id: staffId },
  });

  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, "Staff not found");
  }
  if (staff.status !== "AVAILABLE") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${staff.name} is currently unavailable`,
    );
  }
  // 2️⃣ Get first queue item
  const queueItem = await prisma.queue.findFirst({
    orderBy: { createdAt: "asc" },
  });
  if (!queueItem) {
    throw new ApiError(httpStatus.NOT_FOUND, "No queue items found");
  }
  // 3️⃣ Update appointment
  const appointment = await prisma.appointment.update({
    where: { id: queueItem.appointmentId },
    data: {
      staffId,
      status: "SCHEDULED",
    },
  });
  // 4️⃣ Remove from queue
  await prisma.queue.delete({
    where: { id: queueItem.id },
  });
  return appointment;
};


// ✏ Update
const updateAppointment = async (id: string, payload: any) => {
  return prisma.appointment.update({
    where: { id },
    data: payload,
  });
};

// ❌ Delete
const deleteAppointment = async (id: string) => {
  return prisma.appointment.delete({ where: { id } });
};

export const AppointmentsService = {
  createAppointment,
  getAllAppointments,
  assignAppointmentFromQueue,
  updateAppointment,
  deleteAppointment,
};
