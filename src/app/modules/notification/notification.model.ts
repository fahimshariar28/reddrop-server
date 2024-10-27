import { Schema, model } from "mongoose";
import { INotification } from "./notification.interface";

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    requestId: { type: Schema.Types.ObjectId, ref: "Request", required: false },
    donationId: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: false,
    },
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
