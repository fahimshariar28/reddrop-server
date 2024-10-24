import userValidationSchema from "./user.validation";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import { BloodGroup } from "./user.constant";

// Create a new user
const createUser = catchAsyncFunc(async (req, res) => {
  // Validate the incoming user data
  const validatedData = userValidationSchema.parse({
    ...req.body,
    bloodGroup: req.body.bloodGroup as keyof typeof BloodGroup,
  });

  const user = await UserService.createUser(validatedData as unknown as IUser);

  sendResponseMessage(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
});

// Get all users
const getAllUsers = catchAsyncFunc(async (req, res) => {
  const users = await UserService.getAllUsers();

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Users fetched successfully",
    data: users,
  });
});

// Get a user by ID
const getUserById = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);

  if (!user) {
    sendResponseMessage(res, {
      success: false,
      statusCode: 404,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "User fetched successfully",
    data: user,
  });
});

// Get a user by username
const getUserByUsername = catchAsyncFunc(async (req, res) => {
  const { username } = req.params;
  const user = await UserService.getUserByUsername(username);

  if (!user) {
    sendResponseMessage(res, {
      success: false,
      statusCode: 404,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "User fetched successfully",
    data: user,
  });
});

// Update a user by ID
const updateUser = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  // Validate the incoming user data
  const validatedData = userValidationSchema
    .partial()
    .parse(req.body) as Partial<IUser>; // Allow partial updates

  const updatedUser = await UserService.updateUser(id, validatedData);

  if (!updatedUser) {
    sendResponseMessage(res, {
      success: false,
      statusCode: 404,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Set the password of a user
const setPassword = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  await UserService.setPassword(id, password);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password set successfully",
  });
});

// Change password
const changePassword = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  await UserService.changePassword(id, oldPassword, newPassword);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
  });
});

// Delete a user by ID
const deleteUser = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await UserService.deleteUser(id);

  if (!deletedUser) {
    sendResponseMessage(res, {
      success: false,
      statusCode: 404,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: 204,
    message: "User deleted successfully",
  });
});

// Check if email exists
const checkDuplicateEmail = catchAsyncFunc(async (req, res) => {
  const { email } = req.params;

  const exists = await UserService.checkEmailExists(email);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Email checked successfully",
    data: { exists },
  });
});

// Check if username exists
const checkDuplicateUsername = catchAsyncFunc(async (req, res) => {
  const { username } = req.params;

  const exists = await UserService.checkUsernameExists(username);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Username checked successfully",
    data: { exists },
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  setPassword,
  changePassword,
  deleteUser,
  checkDuplicateEmail,
  checkDuplicateUsername,
};
