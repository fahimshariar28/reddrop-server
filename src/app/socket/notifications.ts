import { Server } from "socket.io";
import { notificationService } from "../modules/notification/notification.service";

export const setupNotifications = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`User connected for notifications: ${socket.id}`);

    socket.on("newNotification", async (data) => {
      // Handle new notification event
      const { userId, title, message, requestId, donationId } = data;

      // Create a new notification
      const notification = await notificationService.createNotification({
        userId,
        title,
        message,
        requestId,
        donationId,
        isRead: false,
        isDeleted: false,
      });

      // Emit the notification to the specific user
      io.to(userId).emit("notificationReceived", notification);
    });

    //   Handle notification read event
    socket.on("notificationRead", async (notificationId) => {
      // Update the notification as read
      await notificationService.updateNotification(notificationId);
    });

    //   Handle notification all read event
    socket.on("allNotificationsRead", async (userId) => {
      // Update all notifications as read
      await notificationService.updateAllNotifications(userId);
    });
  });
};
