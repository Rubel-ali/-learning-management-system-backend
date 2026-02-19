import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ActivityService } from "./Activity.service";

const getLatestLogs = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
  const logs = await ActivityService.getLatestLogs(); 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Activity logs retrieved successfully",
    data: logs,
  });
});


export const ActivityController = { getLatestLogs };
