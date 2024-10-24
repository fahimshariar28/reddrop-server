import DonationModel from "../donation/donation.model";
import { IFeedback } from "./feedback.interface";
import FeedbackModel from "./feedback.model";

// Create Feedback
const createFeedback = async (feedbackData: IFeedback) => {
  const newFeedback = new FeedbackModel(feedbackData);
  const data = await newFeedback.save();

  // add the feedback to the Donation
  await DonationModel.findByIdAndUpdate(data.donationId, {
    $push: { feedback: data._id },
  }).exec();

  return data;
};

// Get All Feedbacks
const getAllFeedbacks = async () => {
  return await FeedbackModel.find().exec();
};

// Get Feedback By Id
const getFeedbackById = async (id: string) => {
  return await FeedbackModel.findById(id).exec();
};

// Get Feedbacks by user id
const getFeedbacksByUserId = async (id: string) => {
  const feedback = await FeedbackModel.find({
    $or: [{ receiverId: id }, { donorId: id }],
  }).exec();

  const received = feedback.filter((feed) => feed.receiverId === id);
  const donated = feedback.filter((feed) => feed.donorId === id);

  const data = { received, donated };
  return data;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  getFeedbacksByUserId,
};
