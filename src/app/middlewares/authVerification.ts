import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { verifyToken } from "../helpers/jwtHelper";
import config from "../config";
import JWTError from "../errors/jwtError";

const authVerification =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new JWTError(
          httpStatus.UNAUTHORIZED,
          "Authorization token is required",
          null
        );
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = verifyToken(token, config.jwt.jwt_secret as string);

      req.user = verifiedUser; // set user in request object

      // role based access
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new JWTError(httpStatus.FORBIDDEN, "You are not allowed", null);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default authVerification;
