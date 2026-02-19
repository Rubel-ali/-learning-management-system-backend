import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { LessonProgressService } from './LessonProgress.service';

const createLessonProgress = catchAsync(async (req, res) => {
  const result = await LessonProgressService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'LessonProgress created successfully',
    data: result,
  });
});

const getLessonProgressList = catchAsync(async (req, res) => {
  const result = await LessonProgressService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LessonProgress list retrieved successfully',
    data: result,
  });
});

const getLessonProgressById = catchAsync(async (req, res) => {
  const result = await LessonProgressService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LessonProgress details retrieved successfully',
    data: result,
  });
});

const updateLessonProgress = catchAsync(async (req, res) => {
  const result = await LessonProgressService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LessonProgress updated successfully',
    data: result,
  });
});

const deleteLessonProgress = catchAsync(async (req, res) => {
  const result = await LessonProgressService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'LessonProgress deleted successfully',
    data: result,
  });
});

export const LessonProgressController = {
  createLessonProgress,
  getLessonProgressList,
  getLessonProgressById,
  updateLessonProgress,
  deleteLessonProgress,
};