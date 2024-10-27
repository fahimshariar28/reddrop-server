import { Schema, model } from "mongoose";
import { IChatMessage } from "./chat.interface";

const chatMessageSchema = new Schema<IChatMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    delivered: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now },
    seenAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const ChatMessage = model<IChatMessage>(
  "ChatMessage",
  chatMessageSchema
);
