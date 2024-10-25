import { ObjectId } from "mongoose";

type IFeedbackDetails = {
  feedback: string;
  rating: number;
};

export type IFeedback = {
  donationId: ObjectId;
  donorId: ObjectId;
  receiverId: ObjectId;
  donorFeedback?: IFeedbackDetails;
  receiverFeedback?: IFeedbackDetails;
};
