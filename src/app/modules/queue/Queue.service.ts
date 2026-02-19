import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

/// Get all queue items with full details for UI
const getQueue = async () => {
  const queues = await prisma.queue.findMany({
    orderBy: { position: "asc" },
    include: {
      appointment: {
        include: {
          service: true,
          staff: true,
        },
      },
    },
  });

  // 🔄 UI friendly response shaping
  return queues.map((q) => {
    const ap = q.appointment;

    return {
      queueId: q.id,
      position: q.position,

      appointmentId: ap.id,
      customerName: ap.customerName,

      // service: {
      //   id: ap.service.id,
      //   name: ap.service.name,
      //   duration: ap.service.duration,
      // },

      appointmentDate: ap.appointmentDate,
      startTime: ap.startTime,
      endTime: ap.endTime,

      staff: ap.staff
        ? {
            id: ap.staff.id,
            name: ap.staff.name,
            status: ap.staff.status,
          }
        : null,

      status: ap.status, // WAITING

      createdAt: q.createdAt,
    };
  });
};


// Assign first queue item to a staff
const assignFromQueue = async (staffId: string) => {
  if (!staffId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "staffId is required");
  }

  // 1️⃣ Check staff
  const staff = await prisma.staff.findUnique({ where: { id: staffId } });
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, "Staff not found");
  }

  if (staff.status !== "AVAILABLE") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${staff.name} is currently unavailable`,
    );
  }

  // 2️⃣ Today date range
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // 3️⃣ Count today's appointments
  const todayAppointments = await prisma.appointment.count({
    where: {
      staffId,
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        in: ["SCHEDULED", "COMPLETED"],
      },
    },
  });

  if (todayAppointments >= staff.dailyCapacity) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${staff.name} already reached daily capacity`,
    );
  }

  // 4️⃣ Get first queue item
  const queueItem = await prisma.queue.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!queueItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Queue is empty");
  }

  // 5️⃣ Assign appointment
  const appointment = await prisma.appointment.update({
    where: { id: queueItem.appointmentId },
    data: {
      staffId,
      status: "SCHEDULED",
    },
  });

  // 6️⃣ Remove from queue
  await prisma.queue.delete({
    where: { id: queueItem.id },
  });

  // 7️⃣ Activity log
  await prisma.activityLog.create({
    data: {
      message: `Appointment for "${appointment.customerName}" assigned to ${staff.name}`,
    },
  });

  return {
    assignedAppointmentId: appointment.id,
    staffId,
    staffName: staff.name,
    customerName: appointment.customerName,
  };
};

export const QueueService = {
  getQueue,
  assignFromQueue,
};
