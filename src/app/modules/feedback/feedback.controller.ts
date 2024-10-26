import { Types } from "mongoose";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { IFeedback } from "./feedback.interface";
import { FeedbackService } from "./feedback.service";

// Create Feedback
const createFeedback = catchAsyncFunc(async (req, res) => {
  const donationId = new Types.ObjectId(req.body.donationId);
  const donorId = new Types.ObjectId(req.body.donorId);
  const receiverId = new Types.ObjectId(req.body.receiverId);

  const feedbackData = {
    ...req.body,
    donationId,
    donorId,
    receiverId,
  } as IFeedback;

  const feedback = await FeedbackService.createFeedback(feedbackData);

  sendResponseMessage(res, {
    success: true,
    statusCode: 201,
    message: "Feedback created successfully",
    data: feedback,
  });
});

// Get all feedbacks
const getAllFeedbacks = catchAsyncFunc(async (req, res) => {
  const feedbacks = await FeedbackService.getAllFeedbacks();

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Feedbacks fetched successfully",
    data: feedbacks,
  });
});

// Get feedback by ID
const getFeedbackById = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  const feedback = await FeedbackService.getFeedbackById(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Feedback fetched successfully",
    data: feedback,
  });
});

// Get feedbacks by user ID
const getFeedbacksByUserId = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;

  const feedbacks = await FeedbackService.getFeedbacksByUserId(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Feedbacks fetched successfully",
    data: feedbacks,
  });
});

// Update feedback
const updateFeedback = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  const feedback = await FeedbackService.updateFeedback(id, req.body);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Feedback updated successfully",
    data: feedback,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  getFeedbacksByUserId,
  updateFeedback,
};
