import express from "express";
import validateZodRequest from "../../middlewares/validateZodRequest";
import { AuthController } from "./auth.controller";
import { authValidation } from "./auth.validation";

// Route to login a user
const router = express.Router();
router.post(
  "/login",
  validateZodRequest(authValidation.loginValidationSchema),
  AuthController.loginUser
);

// Route to refresh the token
router.post("/refresh", AuthController.refreshToken);

// Route to set password
router.put("/set-password/:id", AuthController.setPassword);

// Route to change password
router.put("/change-password/:id", AuthController.changePassword);

export const AuthRoutes = router;
