import jwt, { JwtPayload } from "jsonwebtoken";
import { ROLE } from "../enums/userEnum";

export const createToken = (
  jwtPayload: {
    id: string;
    role: (typeof ROLE)[keyof typeof ROLE];
    email: string;
    name?: string;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const createEmailVerificationToken = (
  email: string,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign({ email }, secret, {
    expiresIn,
  });
};

export const forgetPasswordToken = (
  id: string,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};
