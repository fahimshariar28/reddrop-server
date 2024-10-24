import { Schema, model, Document } from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackDetailsSchema = new Schema({
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
});

const feedbackSchema = new Schema({
  donationId: { type: Schema.Types.ObjectId, ref: "Donation", required: true },
  donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  donorFeedback: { type: feedbackDetailsSchema, required: false },
  receiverFeedback: { type: feedbackDetailsSchema, required: false },
});

const FeedbackModel = model<IFeedback & Document>("Feedback", feedbackSchema);

export default FeedbackModel;
