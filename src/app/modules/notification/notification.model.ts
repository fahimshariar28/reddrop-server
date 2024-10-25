import { Schema, model } from "mongoose";
import { INotification } from "./notification.interface";

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    message: { type: String },
    requestId: { type: Schema.Types.ObjectId, ref: "Request" },
    donationId: { type: Schema.Types.ObjectId, ref: "Donation" },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const NotificationModel = model<INotification & Document>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
