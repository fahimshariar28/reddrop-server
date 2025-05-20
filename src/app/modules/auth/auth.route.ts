import express from "express";
import { AuthController } from "./auth.controller";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";

// Route to login a user
const router = express.Router();
router.post("/login", AuthController.loginUser);

// Route to refresh the token
router.post("/refresh", AuthController.refreshToken);

// Route to set password
router.put(
  "/set-password",
  authVerification(ROLE.ADMIN, ROLE.USER),
  AuthController.setPassword
);

// Route to change password
router.put(
  "/change-password",
  authVerification(ROLE.ADMIN, ROLE.USER),
  AuthController.changePassword
);

// Route to send forgot password token
router.post("/forgot-password-token", AuthController.forgotPasswordToken);

// Route to reset password
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
