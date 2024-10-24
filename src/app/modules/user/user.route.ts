import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

// Route to create a new user
router.post("/", UserController.createUser);

// Route to get all users
router.get("/", UserController.getAllUsers);

// Route to get a user by ID
router.get("/:id", UserController.getUserById);

// Route to get a user by username
router.get("/username/:username", UserController.getUserByUsername);

// Route to update a user by ID
router.put("/:id", UserController.updateUser);

// Route to delete a user by ID
router.put("/delete/:id", UserController.deleteUser);

// Route to check if an email exists
router.get("/check-email/:email", UserController.checkDuplicateEmail);

// Route to check if a username exists
router.get("/check-username/:username", UserController.checkDuplicateUsername);

export const userRouter = router;
