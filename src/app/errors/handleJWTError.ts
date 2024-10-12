/* eslint-disable @typescript-eslint/no-unused-vars */
import { TErrorResponse } from './error.types';
import JWTError from './jwtError';

const handleJWTError = (err: JWTError): TErrorResponse => {
  if (err.stack) {
    delete err.stack;
  }

  return {
    success: false,
    statusCode: err.statusCode,
    message: err.message,
    data: err.data || null,
  };
};

export default handleJWTError;
