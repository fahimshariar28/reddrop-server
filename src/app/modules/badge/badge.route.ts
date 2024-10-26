import { Router } from "express";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";
import { badgeController } from "./badge.controller";

const router = Router();

// Create a new badge
router.post("/", authVerification(ROLE.ADMIN), badgeController.createBadge);

// Get all badges
router.get("/", authVerification(ROLE.ADMIN), badgeController.getAllBadges);

// Get a badge by ID
router.get("/:id", authVerification(ROLE.ADMIN), badgeController.getBadgeById);

// Update a badge
router.put("/:id", authVerification(ROLE.ADMIN), badgeController.updateBadge);

// Delete a badge
router.delete(
  "/:id",
  authVerification(ROLE.ADMIN),
  badgeController.deleteBadge
);

export const badgeRoute = router;
