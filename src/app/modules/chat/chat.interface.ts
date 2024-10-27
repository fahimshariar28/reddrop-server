import { Types } from "mongoose";

export type IChatMessage = {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  delivered: boolean;
  isDeleted: boolean;
  sentAt: Date;
  seenAt?: Date;
};
