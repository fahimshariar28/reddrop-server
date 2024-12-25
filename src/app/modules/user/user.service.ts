import UserModel from "./user.model";
import { IUser } from "./user.interface";
import { ObjectId } from "mongoose";

// Create a new user
const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new UserModel(userData);

  if (user.reference) {
    const referrer = await UserModel.findById(user.reference);
    if (referrer) {
      if (referrer.refereed) {
        referrer.refereed.push(user._id);
      } else {
        referrer.refereed = [user._id];
      }
      await referrer.save();
    }
  }

  return await user.save();
};

// Get all users
const getAllUsers = async () => {
  const data = await UserModel.find().select("-password -__v -oldPasswords");
  const userCount = data.length;
  return {
    userCount,
    data,
  };
};

// Get users by filter
const getUsersByFilter = async (filter: Partial<IUser>) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const users = await UserModel.find({ ...filter, isDeleted: false })
    .select(
      "-password -__v -oldPasswords -isDeleted -socialLink -reference -refereed -socialLogin -role -needPasswordReset -createdAt -updatedAt -notifications -permanentAddress"
    )
    .populate([
      { path: "donated", select: "donatedAt", model: "Donation" },
      { path: "outsideDonation", select: "date" },
      {
        path: "requestReceived",
        populate: {
          path: "requestStatus",
          select: "status time",
          model: "RequestStatus",
        },
      },
    ]);

  const filteredUsers = users.filter((user) => {
    const hasRecentDonation =
      user?.donated?.some(
        (donation) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (donation as any)?.donationTime &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          new Date((donation as any).donationTime) >= threeMonthsAgo
      ) ||
      user?.outsideDonation?.some(
        (donation) => donation.date && new Date(donation.date) >= threeMonthsAgo
      );

    const hasAcceptedRequest = user?.requestReceived?.some((request) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (request as any)?.requestStatus?.some(
        (status: { status: string }) => status.status === "accepted"
      )
    );

    return !(hasRecentDonation || hasAcceptedRequest);
  });

  const userCount = filteredUsers.length;
  const data = filteredUsers.map((user) => user.toObject() as IUser);
  return { userCount, userData: data };
};

// Get a user by ID
const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await UserModel.findById(userId)
    .select("-password -__v -oldPasswords -needPasswordReset")
    .populate({
      path: "socialLink userBadges notifications requestRequested requestReceived donated donationReceived refereed outsideDonation",
    });
  return user ? (user.toObject() as IUser) : null;
};

// Get my profile
const getMyProfile = async (userId: ObjectId): Promise<IUser | null> => {
  const user = await UserModel.findById(userId)
    .select("-password -__v -oldPasswords")
    .populate({
      path: "socialLink userBadges notifications requestRequested requestReceived donated donationReceived refereed outsideDonation",
    });

  return user ? (user.toObject() as IUser) : null;
};

// Get a user by username
const getUserByUsername = async (username: string): Promise<IUser | null> => {
  const user = await UserModel.findOne({ username }).select("-password -__v");
  return user?._id || null;
};

// Update a user by ID
const updateUser = async (
  userId: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  }).select("-password -__v -oldPasswords -needPasswordReset");
  return updatedUser as IUser | null;
};

// Push a new outside donation in zero index
const pushOutsideDonation = async (
  userId: string,
  outsideDonation: { address: string; date?: Date }
) => {
  await UserModel.findByIdAndUpdate(
    userId,
    { $push: { outsideDonation: { $each: [outsideDonation], $position: 0 } } },
    { new: true }
  );
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

// Set user as active
const setUserActive = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, { isActive: true });
};

// Set user as inactive
const setUserInactive = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, { isActive: false });
};

export const UserService = {
  createUser,
  getAllUsers,
  getUsersByFilter,
  getUserById,
  getMyProfile,
  getUserByUsername,
  updateUser,
  pushOutsideDonation,
  deleteUser,
  checkEmailExists,
  checkUsernameExists,
  setUserActive,
  setUserInactive,
};
