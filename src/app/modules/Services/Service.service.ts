import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { IService } from "./Service.interface";

const createService = async (payload: IService) => {
  // Check for required fields
  if (!payload.name || !payload.duration || !payload.requiredStaffType) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "All service fields are required",
    );
  }

  const service = await prisma.service.create({
    data: payload,
  });

  return service;
};

const getAllServices = async () => {
    if (!prisma.service) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Service model not found",
    );
  }
  
  const services = await prisma.service.findMany();
  return services;
};

const updateService = async (id: string, payload: Partial<IService>) => {
  const service = await prisma.service.update({
    where: { id },
    data: {
      name: payload.name,
      duration: payload.duration,
      requiredStaffType: payload.requiredStaffType,
    },
  });
  return service;
};

const deleteService = async (id: string) => {
  const service = await prisma.service.delete({
    where: { id },
  });
  return service;
};

export const ServiceService = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
