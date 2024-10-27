import { notificationService } from "./notification.service";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import httpStatus from "http-status";

// Create notification
// export const createNotification = catchAsyncFunc(async (req, res) => {
//   const notification = await notificationService.createNotification(req.body);
//   sendResponseMessage(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "Notification created successfully",
//     data: notification,
//   });
// });

// Get Notifications by user id
export const getNotificationsByUserId = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;

  const notifications = await notificationService.getNotificationsByUserId(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notifications fetched successfully",
    data: notifications,
  });
});

// Update notification as read
export const updateNotification = catchAsyncFunc(async (req, res) => {
  const id = req.params.notificationId;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notification = await notificationService.updateNotification(id as any);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notification updated successfully",
    data: notification,
  });
});

// Delete notification
export const deleteNotification = catchAsyncFunc(async (req, res) => {
  const id = req.params.notificationId;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notification = await notificationService.deleteNotification(id as any);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Notification deleted successfully",
    data: notification,
  });
});

export const notificationController = {
  // createNotification,
  getNotificationsByUserId,
  updateNotification,
  deleteNotification,
};
