import { Types } from "mongoose";

export type INotification = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  message: string;
  requestId?: Types.ObjectId;
  donationId?: Types.ObjectId;
  isRead: boolean;
  isDeleted: boolean;
};
