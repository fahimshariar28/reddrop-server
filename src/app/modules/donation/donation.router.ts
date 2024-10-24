import { Router } from "express";
import { DonationController } from "./donation.controller";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";

const router = Router();

// Create a donation
router.post(
  "/",
  authVerification(ROLE.ADMIN, ROLE.USER),
  DonationController.createDonation
);

// Get all donations
router.get(
  "/",
  authVerification(ROLE.ADMIN),
  DonationController.getAllDonations
);

// Get donations by user ID
router.get(
  "/user",
  authVerification(ROLE.ADMIN, ROLE.USER),
  DonationController.getDonationsByUserId
);

// Get donation by ID
router.get(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  DonationController.getDonationById
);

export const donationRoute = router;
