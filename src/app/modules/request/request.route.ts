import { Router } from "express";
import { RequestController } from "./request.controller";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";

const router = Router();

// Create a new request
router.post(
  "/",
  authVerification(ROLE.ADMIN, ROLE.USER),
  RequestController.createRequest
);

// Get all requests
router.get("/", authVerification(ROLE.ADMIN), RequestController.getAllRequests);

// Get requests by user ID
router.get(
  "/user",
  authVerification(ROLE.ADMIN, ROLE.USER),
  RequestController.getRequestsByUserId
);

// Get request by ID
router.get(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  RequestController.getRequestById
);

// Update a request by ID
router.put(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  RequestController.updateRequest
);

export const requestRoute = router;
