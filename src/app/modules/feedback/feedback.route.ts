import { Router } from "express";
import { FeedbackController } from "./feedback.controller";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";

const router = Router();

// Create feedback
router.post(
  "/",
  authVerification(ROLE.USER, ROLE.ADMIN),
  FeedbackController.createFeedback
);

// Get all feedbacks
router.get(
  "/",
  authVerification(ROLE.ADMIN),
  FeedbackController.getAllFeedbacks
);

// Get feedbacks by user ID
router.get(
  "/user",
  authVerification(ROLE.USER, ROLE.ADMIN),
  FeedbackController.getFeedbacksByUserId
);

// Get feedback by ID
router.get(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  FeedbackController.getFeedbackById
);

// Update feedback
router.put(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  FeedbackController.updateFeedback
);

export const feedbackRoute = router;
