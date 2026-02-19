import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ReviewService } from './Review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getReviewList = catchAsync(async (req, res) => {
  const result = await ReviewService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review list retrieved successfully',
    data: result,
  });
});

const getReviewById = catchAsync(async (req, res) => {
  const result = await ReviewService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review details retrieved successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const result = await ReviewService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviewList,
  getReviewById,
  updateReview,
  deleteReview,
};