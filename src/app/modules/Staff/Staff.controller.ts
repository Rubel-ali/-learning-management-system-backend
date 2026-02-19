import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { StaffService } from "./Staff.service";

const createStaff = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await StaffService.createStaff(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Staff created successfully",
      data: staff,
    });
  } catch (error) {
    next(error);
  }
});

const getAllStaff = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const staffList = await StaffService.getAllStaff();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Staff retrieved successfully",
      data: staffList,
    });
  } catch (error) {
    next(error);
  }
});

const updateStaff = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const staff = await StaffService.updateStaff(id, updatedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Staff updated successfully",
      data: staff,
    });
  }
  catch (error) {
    next(error);
  }
});

const deleteStaff = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // Implement delete logic if needed
    const staff = await StaffService.deleteStaff(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Staff with id ${id} deleted successfully`,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
}
);

const updateStaffStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const staff = await StaffService.updateStatus(id, status);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Staff status updated successfully",
      data: staff,
    });
  } catch (error) {
    next(error);
  }
});

export const StaffController = {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  updateStaffStatus,
};
