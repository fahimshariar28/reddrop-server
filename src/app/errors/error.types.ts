/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
  statusCode: number;
  success?: boolean;
  message: string;
  errorMessage?: string;
  errorDetails?: {
    issues?: TErrorIssue[];
    name?: string;
    stringValue?: string;
    valueType?: string;
    kind?: string;
    value?: string;
    reason?: any;
    stack?: string;
    path?: string;
    message?: string;
    errorCode?: string;
  };
  issues?: TErrorIssue[];
  stack?: string;
  data?: any;
};
export type TErrorIssue = {
  expected?: string;
  received?: string;
  code?: string;
  path?: string;
  message: string;
  errorMessage?: string;
};
export type GenericError = {
  statusCode: number;
  success?: boolean;
  errorMessage?: string;
  message?: string;
  issues?: { path: string; message: any }[];
};
