import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ServiceService } from "./Service.service";

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ServiceService.createService(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service created successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  },
);

const getAllServices = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const services = await ServiceService.getAllServices();

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrieved successfully",
        data: services,
      });
    } catch (error) {
      next(error);
    }
  },
);

const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ServiceService.updateService(
        req.params.id,
        req.body,
      );
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  },
);

const deleteService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const service = await ServiceService.deleteService(id);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const ServiceController = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
