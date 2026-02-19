import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { EnrollmentService } from './Enrollment.service';

const createEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Enrollment created successfully',
    data: result,
  });
});

const getEnrollmentList = catchAsync(async (req, res) => {
  const result = await EnrollmentService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrollment list retrieved successfully',
    data: result,
  });
});

const getEnrollmentById = catchAsync(async (req, res) => {
  const result = await EnrollmentService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrollment details retrieved successfully',
    data: result,
  });
});

const updateEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrollment updated successfully',
    data: result,
  });
});

const deleteEnrollment = catchAsync(async (req, res) => {
  const result = await EnrollmentService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrollment deleted successfully',
    data: result,
  });
});

export const EnrollmentController = {
  createEnrollment,
  getEnrollmentList,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};