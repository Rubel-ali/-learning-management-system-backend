import prisma from "../../../shared/prisma";
import { AppointmentStatus } from "@prisma/client";

// Utility: Get today range (UTC safe)
const getTodayRange = () => {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  return { start, end };
};

const getDashboardData = async () => {
  const { start, end } = getTodayRange();

  // 🔹 Total Appointments Today
  const totalAppointments = await prisma.appointment.count({
    where: {
      appointmentDate: { gte: start, lte: end },
    },
  });

  // 🔹 Completed Appointments
  const completed = await prisma.appointment.count({
    where: {
      appointmentDate: { gte: start, lte: end },
      status: AppointmentStatus.COMPLETED,
    },
  });

  // 🔹 Pending Appointments (Scheduled + Waiting)
  const pending = await prisma.appointment.count({
    where: {
      appointmentDate: { gte: start, lte: end },
      status: {
        in: [AppointmentStatus.SCHEDULED, AppointmentStatus.WAITING],
      },
    },
  });

  // 🔹 Waiting Queue Count
  const waitingQueueCount = await prisma.queue.count();

  // 🔹 Staff Load Summary
  const staffs = await prisma.staff.findMany();
  const staffLoad = [];

  for (const staff of staffs) {
    const todayCount = await prisma.appointment.count({
      where: {
        staffId: staff.id,
        appointmentDate: { gte: start, lte: end },
        status: {
          in: [AppointmentStatus.SCHEDULED, AppointmentStatus.COMPLETED],
        },
      },
    });

    staffLoad.push({
      staffId: staff.id,
      name: staff.name,
      used: todayCount,
      capacity: staff.dailyCapacity,
      isFull: todayCount >= staff.dailyCapacity,
      label: `${staff.name} — ${todayCount} / ${staff.dailyCapacity} ${
        todayCount >= staff.dailyCapacity ? "(Booked)" : "(OK)"
      }`,
    });
  }

  return {
    totalAppointments,
    completed,
    pending,
    waitingQueueCount,
    staffLoad,
  };
};

export const DashboardService = {
  getDashboardData,
};