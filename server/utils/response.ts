import type { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message?: string,
  data?: T
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  } as ApiResponse<T>);
};
