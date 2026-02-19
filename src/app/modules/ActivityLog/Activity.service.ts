import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const getLatestLogs = async () => {
  if (!prisma.activityLog) {
    throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "ActivityLog model not found",
    );
  } 
    const logs = await prisma.activityLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
    });
    return logs;
};

export const ActivityService = {
  getLatestLogs
};
