import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { LessonService } from './Lesson.service';

const createLesson = catchAsync(async (req, res) => {
  const result = await LessonService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data: result,
  });
});

const getLessonList = catchAsync(async (req, res) => {
  const result = await LessonService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson list retrieved successfully',
    data: result,
  });
});

const getLessonById = catchAsync(async (req, res) => {
  const result = await LessonService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson details retrieved successfully',
    data: result,
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const result = await LessonService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson updated successfully',
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const result = await LessonService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lesson deleted successfully',
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getLessonList,
  getLessonById,
  updateLesson,
  deleteLesson,
};