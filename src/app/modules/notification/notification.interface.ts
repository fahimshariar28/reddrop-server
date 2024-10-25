import { Types } from "mongoose";

export type INotification = {
  userId: Types.ObjectId;
  title: string;
  message: string;
  requestId?: Types.ObjectId;
  donationId?: Types.ObjectId;
  isRead: boolean;
  isDeleted: boolean;
};
