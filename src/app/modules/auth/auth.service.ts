/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import GenericError from "../../errors/genericError";
import UserModel from "../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import {
  createToken,
  forgetPasswordToken,
  verifyToken,
} from "../../helpers/jwtHelper";
import { hashPasswordHelper } from "../../helpers/hashPasswordHelper";
import { forgetPasswordBody, resetPasswordBody } from "../../utils/emailBody";
import { sendEmail } from "../../utils/sendEmail";

// Login a user
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  // console.log(payload);
  const isUserExists = await UserModel.findOne({
    $or: [
      { email: payload?.emailOrUsername },
      { username: payload?.emailOrUsername },
    ],
  }).select("+password ");
  //   console.log(isUserExists);
  if (!isUserExists) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );

  if (isUserExists?.isDeleted) {
    throw new GenericError(httpStatus.UNAUTHORIZED, "User is deleted");
  }

  //   console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new GenericError(httpStatus.UNAUTHORIZED, "Password not matched");
  }

  const needPasswordChange = isUserExists?.needPasswordReset;

  const jwtPayload = {
    id: isUserExists?._id.toString(),
    role: isUserExists?.role,
    email: isUserExists?.email,
    name: isUserExists?.name,
  };
  //   console.log(jwtPayload);

  // Access Token
  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string
  );

  // Refresh Token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt.jwt_refresh_secret as string,
    config.jwt.jwt_refresh_expires_in as string
  );

  //   console.log(accessToken, refreshToken);
  return { needPasswordChange, accessToken, refreshToken };
};

// Refresh the access token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const decoded = verifyToken(token, config.jwt.jwt_refresh_secret as string);
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }

  const jwtPayload = {
    id: user._id.toString(),
    role: user.role,
    email: user.email,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expires_in as string
  );

  return { accessToken };
};

// Set the password of a user
const setPassword = async (userId: string, password: string) => {
  // Check if the user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the needPasswordReset is false
  if (!user.needPasswordReset) {
    throw new GenericError(
      httpStatus.BAD_REQUEST,
      "Password is already set for the user"
    );
  }

  const hashedPassword = await hashPasswordHelper(password);

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
  const user = await UserModel.findById(userId)
    .select("password oldPasswords")
    .lean();

  if (!user) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new GenericError(
      httpStatus.UNAUTHORIZED,
      "Old password is incorrect"
    );
  }

  // Check if the new password is the same as the old password
  const oldPasswords = user.oldPasswords || [];
  const isSamePassword = oldPasswords.some((password: string) =>
    bcrypt.compareSync(newPassword, password)
  );
  if (isSamePassword) {
    throw new GenericError(
      httpStatus.BAD_REQUEST,
      "New password cannot be the same as the old password"
    );
  }

  const hashedPassword = await hashPasswordHelper(newPassword);

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

// Forgot password token
const forgotPasswordToken = async (email: string) => {
  const user = await UserModel.findOne({ email })
    .select("name email isDeleted")
    .lean();
  if (!user) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the user is deleted
  if (user?.isDeleted) {
    throw new GenericError(httpStatus.UNAUTHORIZED, "User is deleted");
  }

  // Token for password reset
  const token = forgetPasswordToken(
    user._id.toString(),
    config.passwordReset.secret as string,
    config.passwordReset.expiration as string
  );

  // Reset password link
  const resetPasswordLink = `${config.front_end_url}/reset-password?email=${user.email}&token=${token}`;

  // Email Body
  const emailBody = forgetPasswordBody(user.name, resetPasswordLink);

  // Send the token to the user's email
  await sendEmail(user.email, "Red Drop - Forgot Password", emailBody);

  return null;
};

// Reset password
const resetPassword = async (id: string, password: string) => {
  const user = await UserModel.findById(id)
    .select("name email password oldPasswords isDeleted")
    .lean();

  if (!user) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the user is deleted
  if (user?.isDeleted) {
    throw new GenericError(httpStatus.UNAUTHORIZED, "User is deleted");
  }

  const hashedPassword = await hashPasswordHelper(password);
  // Check if the new password is the same as the old password
  const oldPasswords = user.oldPasswords || [];
  const isSamePassword = oldPasswords.some((oldPassword: string) =>
    bcrypt.compareSync(password, oldPassword)
  );

  if (isSamePassword) {
    throw new GenericError(
      httpStatus.BAD_REQUEST,
      "New password cannot be the same as the old password"
    );
  }

  // Add the old password to the oldPasswords array
  await UserModel.findByIdAndUpdate(user._id, {
    $push: { oldPasswords: user.password },
  }).select("-password -__v");

  // Update the password
  await UserModel.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  }).select("-password -__v");

  // Email Body
  const emailBody = resetPasswordBody(user.name);

  // Send the confirmation email
  await sendEmail(
    user.email,
    "Red Drop - Password Reset Successful",
    emailBody
  );

  return null;
};

export const AuthService = {
  userLogin,
  refreshToken,
  setPassword,
  changePassword,
  forgotPasswordToken,
  resetPassword,
};
