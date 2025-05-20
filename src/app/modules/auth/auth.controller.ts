import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { ILoginUser } from "./auth.interface";
import { AuthService } from "./auth.service";

// Login a user
const loginUser = catchAsyncFunc(async (req, res) => {
  const user = await AuthService.userLogin(req.body as ILoginUser);

  const { accessToken, refreshToken, needPasswordChange } = user;

  // set refresh token in cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "User log in successful",
    data: {
      needPasswordChange,
      accessToken,
    },
  });
});

// Refresh the access token
const refreshToken = catchAsyncFunc(async (req, res) => {
  const { refreshToken } = req.cookies;

  const accessToken = await AuthService.refreshToken(refreshToken);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Token refreshed successfully",
    data: accessToken,
  });
});

// Set the password of a user
const setPassword = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;
  const { password } = req.body;

  await AuthService.setPassword(id, password);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password set successfully",
  });
});

// Change password
const changePassword = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  await AuthService.changePassword(id, oldPassword, newPassword);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
  });
});

// Forgot password token
const forgotPasswordToken = catchAsyncFunc(async (req, res) => {
  const { email } = req.body;

  const result = await AuthService.forgotPasswordToken(email);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Reset password token sent to your email",
    data: result,
  });
});

// Reset password
const resetPassword = catchAsyncFunc(async (req, res) => {
  const { id, password } = req.body;

  await AuthService.resetPassword(id, password);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password reset successfully",
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  setPassword,
  changePassword,
  forgotPasswordToken,
  resetPassword,
};
