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
  "/set-password/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  AuthController.setPassword
);

// Route to change password
router.put(
  "/change-password/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  AuthController.changePassword
);

export const AuthRoutes = router;
