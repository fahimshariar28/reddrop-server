import { Router } from "express";
import { UserController } from "./user.controller";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";

const router = Router();

// Route to create a new user
router.post("/", UserController.createUser);

// Route to get all users
router.get("/", authVerification(ROLE.ADMIN), UserController.getAllUsers);

// Route to get users by filter
router.get("/filter", UserController.getUsersByFilter);

// Route to get my profile
router.get(
  "/my-profile",
  authVerification(ROLE.ADMIN, ROLE.USER),
  UserController.getMyProfile
);

// Route to get a user by ID
router.get(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  UserController.getUserById
);

// Route to get a user by username
router.get("/username/:username", UserController.getUserByUsername);

// Route to push a new outside donation
router.put(
  "/outside-donation",
  authVerification(ROLE.ADMIN, ROLE.USER),
  UserController.pushOutsideDonation
);

// Route to update a user by ID
router.put(
  "/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  UserController.updateUser
);

// Route to delete a user by ID
router.put(
  "/delete/:id",
  authVerification(ROLE.ADMIN, ROLE.USER),
  UserController.deleteUser
);

// Route to check if an email exists
router.get("/check-email/:email", UserController.checkDuplicateEmail);

// Route to check if a username exists
router.get("/check-username/:username", UserController.checkDuplicateUsername);

export const userRoute = router;
