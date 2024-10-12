import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './error.types';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errValues = Object.values(err.errors);
  const issues: TErrorIssue[] = [];
  errValues.forEach(element => {
    issues.push({
      path: element.path,
      message: element.message,
    });
  });
  // console.log(issues);

  return {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: 'Validation Error',
    errorMessage: 'Validation Error',
    errorDetails: {
      name: err.name,
      issues,
      errorCode: 'validation_error',
    },
  };
};

export default handleValidationError;
