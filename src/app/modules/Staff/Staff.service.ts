import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { StaffCreateInput } from "./Staff.interface";
import { StaffStatus } from "@prisma/client";

const createStaff = async (staffData: StaffCreateInput) => {
  // Check for required fields
  if (
    !staffData.name ||
    !staffData.serviceType ||
    !staffData.dailyCapacity ||
    !staffData.status
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "All staff fields are required");
  }

  const staff = await prisma.staff.create({
    data: staffData,
  });

  return staff;
};

const getAllStaff = async () => {
    if (!prisma.staff) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
        "Staff model not found",
    );
  }
  
  const staffList = await prisma.staff.findMany();
  return staffList;
};

const updateStaff = async (id: string, updatedData: Partial<StaffCreateInput>) => {
  const staff = await prisma.staff.update({
    where: { id },
    data: updatedData,
  });
  return staff;
};

const deleteStaff = async (id: string) => {
  const staff = await prisma.staff.delete({
    where: { id },
  });
  return staff;
}

const updateStatus = async (id: string, status: StaffStatus) => {
  const staff = await prisma.staff.update({
    where: { id },
    data: { status },
  });

  return staff;
};

export const StaffService = {
  createStaff,
  getAllStaff,
  deleteStaff,
  updateStaff,
  updateStatus,
};
