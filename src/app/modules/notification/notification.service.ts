import { ObjectId } from "mongoose";
import { INotification } from "./notification.interface";
import NotificationModel from "./notification.model";

// Create notification
const createNotification = async (
  notification: INotification
): Promise<INotification> => {
  const newNotification = new NotificationModel(notification);
  return await newNotification.save();
};

// Get Notifications by user id
const getNotificationsByUserId = async (
  userId: ObjectId
): Promise<INotification[]> => {
  return await NotificationModel.find({
    userId: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

// Update notification as read
const updateNotification = async (
  notificationId: ObjectId
): Promise<INotification | null> => {
  return await NotificationModel.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

// Update all notifications as read
const updateAllNotifications = async (userId: ObjectId) => {
  return await NotificationModel.updateMany(
    { userId, isDeleted: false },
    { isRead: true }
  );
};

// Delete notification
const deleteNotification = async (
  notificationId: ObjectId
): Promise<INotification | null> => {
  // soft delete
  return await NotificationModel.findByIdAndUpdate(
    notificationId,
    { isDeleted: true },
    { new: true }
  );
};

export const notificationService = {
  createNotification,
  getNotificationsByUserId,
  updateNotification,
  updateAllNotifications,
  deleteNotification,
};
