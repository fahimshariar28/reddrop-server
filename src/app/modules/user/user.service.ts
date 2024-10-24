import UserModel from "./user.model";
import { IUser } from "./user.interface";

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
  deleteUser,
  checkEmailExists,
  checkUsernameExists,
};
