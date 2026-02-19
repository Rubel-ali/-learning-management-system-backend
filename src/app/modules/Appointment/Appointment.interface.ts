import { AppointmentStatus } from "@prisma/client";

export interface ICreateAppointment {
  customerName: string;
  serviceId: string;
  staffId?: string;
  appointmentDate: string; // ISO string from client
  startTime: string;
  endTime: string;
}

export interface IAppointmentFilters {
  staffId?: string;
  status?: AppointmentStatus;
  searchTerm?: string;
}
