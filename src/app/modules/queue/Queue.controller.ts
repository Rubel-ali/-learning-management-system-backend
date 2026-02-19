import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { QueueService } from "./Queue.service";
import ApiError from "../../../errors/ApiErrors";

const getQueue = catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
  const queue = await QueueService.getQueue();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Queue retrieved successfully",
    data: queue,
  });
});

const assignFromQueue = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { staffId } = req.body;
  if (!staffId) return next(new ApiError(httpStatus.BAD_REQUEST, "staffId is required"));

  const assigned = await QueueService.assignFromQueue(staffId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assigned from queue successfully",
    data: assigned,
  });
});

export const QueueController = { getQueue, assignFromQueue };
