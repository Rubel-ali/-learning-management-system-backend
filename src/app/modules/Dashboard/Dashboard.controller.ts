import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { DashboardService } from "./Dashboard.service";

const getDashboard = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    const data = await DashboardService.getDashboardData();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Dashboard data retrieved successfully",
      data,
    });
  },
);

export const DashboardController = {
  getDashboard,
};
