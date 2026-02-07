import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || null;

  sendResponse(res, status, false, message, errors);
};
