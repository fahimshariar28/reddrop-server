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
import { createToken, verifyToken } from "../../helpers/jwtHelper";

// Login a user
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  // console.log(payload);
  const isUserExists = await UserModel.findOne({
    email: payload?.email,
  }).select("+password ");
  //   console.log(isUserExists);
  if (!isUserExists) {
    throw new GenericError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
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
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );

  // Refresh Token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  //   console.log(accessToken, refreshToken);
  return { needPasswordChange, accessToken, refreshToken };
};

// Refresh the access token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
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
    config.jwt_secret as string,
    config.jwt_expires_in as string
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

export const AuthService = {
  userLogin,
  refreshToken,
  setPassword,
  changePassword,
};
