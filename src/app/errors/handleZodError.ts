import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { TErrorIssue, TErrorResponse } from './error.types';

const handlerZodError = (err: ZodError): TErrorResponse => {
  let errorMessage = '';
  const issues: TErrorIssue[] = err.issues.map(issue => {
    const path = issue.path.join('.');

    errorMessage = `${path} is ${issue.message}`;
    return {
      code: issue.code,
      message: issue.message,
      errorMessage,
    };
  });

  const errorMessages = issues.map(issue => issue.errorMessage).join(', ');

  return {
    statusCode: httpStatus.BAD_REQUEST,
    success: false,
    message: 'Validation Error',
    errorMessage: errorMessages,
    errorDetails: {
      issues,
      name: err.name,
    },
    stack: err.stack || '',
  };
};

export default handlerZodError;
