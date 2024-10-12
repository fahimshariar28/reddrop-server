import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './error.types';

const handlerCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: err.path || '_id',
      message: `${err.value} is not a valid ID!`,
    },
  ];
  console.log(issues);
  return {
    statusCode: 400,
    success: false,
    message: 'Invalid ID',
    errorMessage: `${err.value} is not a valid ID!`,
    errorDetails: {
      stringValue: err.value,
      valueType: typeof err.value,
      kind: err.kind,
      value: err.value,
      path: err.path || '_id',
      reason: err.reason || {},
      name: err.name,
      message: err.message,
    },
    stack: err.stack || '',
  };
};

export default handlerCastError;
