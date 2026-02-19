import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AppointmentsService } from "./Appointment.service";
import pick from "../../../shared/pick";
import { appointmentFilterableFields } from "./Appointment.constant";

const createAppointment = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.staffId) delete req.body.staffId;

  const result = await AppointmentsService.createAppointment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Appointment created successfully",
    data: result,
  });
});

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AppointmentsService.getAllAppointments(
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointments retrieved successfully",
    data: result,
  });
});

const assignAppointmentFromQueue = catchAsync(async (req: Request, res: Response) => {
  const staffId = req.body.staffId;

  const result = await AppointmentsService.assignAppointmentFromQueue(staffId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment assigned from queue successfully",
    data: result,
  });
});


const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentsService.updateAppointment(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment updated successfully",
    data: result,
  });
});

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentsService.deleteAppointment(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment deleted successfully",
    data: result,
  });
});

export const AppointmentController = {
  createAppointment,
  getAllAppointments,
  assignAppointmentFromQueue,
  updateAppointment,
  deleteAppointment,
};
