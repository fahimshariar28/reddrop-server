import UserModel from "./user.model";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

// Create a new user
const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new UserModel(userData);
  return await user.save();
};

// Get all users
const getAllUsers = async (): Promise<IUser[]> => {
  return await UserModel.find().select("-password -__v");
};

// Get a user by ID
const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await UserModel.findById(userId).select("-password -__v");
  return user ? (user.toObject() as IUser) : null;
};

// Get a user by username
const getUserByUsername = async (username: string): Promise<IUser | null> => {
  const user = await UserModel.findOne({ username }).select("-password -__v");
  return user ? (user.toObject() as IUser) : null;
};

// Update a user by ID
const updateUser = async (
  userId: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  }).select("-password -__v");
  return updatedUser as IUser | null;
};

// Set the password of a user
const setPassword = async (userId: string, password: string) => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.password_salt)
  );

  // Update the password and set needPasswordReset to false
  await UserModel.findByIdAndUpdate(userId, {
    password: hashedPassword,
    needPasswordReset: false,
  }).select("-password -__v");
};

// Change password
const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  const user = await UserModel.findById(userId).select("password").lean();

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new Error("Old password is incorrect");
  }

  // Check if the new password is the same as the old password
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    throw new Error("New password cannot be the same as the old password");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.password_salt)
  );

  // Update the password
  await UserModel.findByIdAndUpdate(userId, {
    password: hashedPassword,
  }).select("-password -__v");

  // Add the old password to the oldPasswords array
  await UserModel.findByIdAndUpdate(userId, {
    $push: { oldPasswords: user.password },
  }).select("-password -__v");

  return true;
};

// Delete a user by ID
const deleteUser = async (userId: string) => {
  const user = await UserModel.findById(userId).select("-password -__v");
  if (!user) {
    return null;
  }

  // Soft delete the user
  await UserModel.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true }
  ).select("-password -__v");
};

// Check if email exists
const checkEmailExists = async (email: string): Promise<boolean> => {
  const user = await UserModel.findOne({ email });
  return !!user; // Return true if user exists, false otherwise
};

// Check if username exists
const checkUsernameExists = async (username: string): Promise<boolean> => {
  const user = await UserModel.findOne({ username });
  return !!user; // Return true if user exists, false otherwise
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  setPassword,
  changePassword,
  deleteUser,
  checkEmailExists,
  checkUsernameExists,
};
