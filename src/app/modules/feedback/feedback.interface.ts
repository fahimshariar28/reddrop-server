type IFeedbackDetails = {
  feedback: string;
  rating: number;
};

export type IFeedback = {
  donationId: string;
  donorId: string;
  receiverId: string;
  donorFeedback?: IFeedbackDetails;
  receiverFeedback?: IFeedbackDetails;
};
