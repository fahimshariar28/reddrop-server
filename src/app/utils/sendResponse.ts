/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
};

const sendResponseMessage = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data?.statusCode).json({
    success: "true",
    statusCode: data?.statusCode,
    message: data?.message,
    data: data?.data,
  });
};
export default sendResponseMessage;
