import { TErrorIssue } from './error.types';

class GenericError extends Error {
  public statusCode: number;
  public errorMessage?: string;
  public issues?: TErrorIssue[];

  constructor(
    code: number,
    message: string,
    stack?: '',
    errorMessage?: string,
    issues?: TErrorIssue[],
  ) {
    super(message);
    this.statusCode = code;
    if (stack) {
      this.stack = stack;
      this.errorMessage = errorMessage;
      this.issues = issues;
      console.log(stack);
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default GenericError;
