import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { FeedbackService } from "./feedback.service";
import { feedbackValidationSchema } from "./feedback.validation";

// Create Feedback
const createFeedback = catchAsyncFunc(async (req, res) => {
  const feedbackValidation = feedbackValidationSchema.parse(req.body);

  const feedback = await FeedbackService.createFeedback(feedbackValidation);

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

export const FeedbackController = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  getFeedbacksByUserId,
};
