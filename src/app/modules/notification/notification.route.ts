import { Router } from "express";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";
import { notificationController } from "./notification.controller";

const router = Router();

// Create notification
router.post(
  "/",
  authVerification(ROLE.ADMIN, ROLE.USER),
  notificationController.createNotification
);

// Get Notifications by user id
router.get(
  "/",
  authVerification(ROLE.ADMIN, ROLE.USER),
  notificationController.getNotificationsByUserId
);

// Update notification as read
router.put(
  "/:notificationId",
  authVerification(ROLE.ADMIN, ROLE.USER),
  notificationController.updateNotification
);

// Delete notification
router.put(
  "/delete/:notificationId",
  authVerification(ROLE.ADMIN, ROLE.USER),
  notificationController.deleteNotification
);

export const notificationRoute = router;
