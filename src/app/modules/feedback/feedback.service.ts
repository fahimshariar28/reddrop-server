import { ObjectId } from "mongoose";
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
const getFeedbacksByUserId = async (id: ObjectId) => {
  // const feedback = await FeedbackModel.find({
  //   $or: [{ receiverId: id }, { donorId: id }],
  // }).exec();

  // find feedback where the user is the donor
  const feedbackAsDonor = await FeedbackModel.find({
    donorId: id,
  }).exec();

  // find feedback where the user is the receiver
  const feedbackAsReceiver = await FeedbackModel.find({
    receiverId: id,
  }).exec();

  const feedback = feedbackAsDonor.concat(feedbackAsReceiver);

  return feedback;
};

// Update Feedback
const updateFeedback = async (id: string, feedbackData: IFeedback) => {
  return await FeedbackModel.findByIdAndUpdate(id, feedbackData, {
    new: true,
  }).exec();
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  getFeedbacksByUserId,
  updateFeedback,
};
