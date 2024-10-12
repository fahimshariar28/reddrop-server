import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './error.types';

const handlerDuplicateError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const regex = /"(.*?)"/;
  const matches = err.message.match(regex);
  const issues: TErrorIssue[] = [
    {
      path: '',
      message: `Duplicate value for ${matches![1]}`,
    },
  ];

  return {
    statusCode: 409,
    success: false,
    message: 'Duplicate Error',
    errorMessage: `Duplicate value for ${matches![1]}`,
    errorDetails: {
      name: err.name,
      message: err.message,
      issues,
      valueType: matches![1],
      errorCode: 'duplicate_error',
    },
  };
};

export default handlerDuplicateError;
