/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import GenericError from './genericError';
import handlerCastError from './handleCastError';
import handlerDuplicateError from './handleDuplicateError';
import handlerGenericError from './handleGenericError';
import handleJWTError from './handleJWTError';
import handleValidationError from './handleValidationError';
import handlerZodError from './handleZodError';
import JWTError from './jwtError';

const errorPreprocessor = (error: any) => {
  if (error instanceof ZodError) {
    return handlerZodError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(error);
  } else if (error.code && error.code === 11000) {
    return handlerDuplicateError(error);
  } else if (error instanceof mongoose.Error.CastError) {
    return handlerCastError(error);
  } else if (error instanceof GenericError) {
    return handlerGenericError(error);
  } else if (error instanceof JWTError) {
    return handleJWTError(error);
  } else {
    return {
      success: false,
      statusCode: 500,

      message: 'Unknown Error',
      issues: [
        {
          path: '',
          message: error.message,
        },
      ],
    };
  }
};

export default errorPreprocessor;
