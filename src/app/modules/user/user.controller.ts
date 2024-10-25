import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import { userFilter } from "./user.filter";
import httpStatus from "http-status";

// Create a new user
const createUser = catchAsyncFunc(async (req, res) => {
  const user = await UserService.createUser(req.body as IUser);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

// Get all users
const getAllUsers = catchAsyncFunc(async (req, res) => {
  const users = await UserService.getAllUsers();

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users fetched successfully",
    data: users,
  });
});

// Get users by filter
const getUsersByFilter = catchAsyncFunc(async (req, res) => {
  const filters = userFilter(req.query);

  const users = await UserService.getUsersByFilter(filters as Partial<IUser>);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
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
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// Get my profile
const getMyProfile = catchAsyncFunc(async (req, res) => {
  const user = await UserService.getMyProfile(req.user.id);

  if (!user) {
    sendResponseMessage(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
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
      statusCode: httpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// Update a user by ID
const updateUser = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;

  const updatedUser = await UserService.updateUser(
    id,
    req.body as Partial<IUser>
  );

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Push a new outside donation
const pushOutsideDonation = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;
  const { address, date } = req.body;

  await UserService.pushOutsideDonation(id, { address, date });

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Outside donation pushed successfully",
  });
});

// Delete a user by ID
const deleteUser = catchAsyncFunc(async (req, res) => {
  const id = req.params.id;

  await UserService.deleteUser(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
  });
});

// Check if email exists
const checkDuplicateEmail = catchAsyncFunc(async (req, res) => {
  const { email } = req.params;

  const exists = await UserService.checkEmailExists(email);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
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
    statusCode: httpStatus.OK,
    message: "Username checked successfully",
    data: { exists },
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUsersByFilter,
  getUserById,
  getMyProfile,
  getUserByUsername,
  updateUser,
  pushOutsideDonation,
  deleteUser,
  checkDuplicateEmail,
  checkDuplicateUsername,
};
