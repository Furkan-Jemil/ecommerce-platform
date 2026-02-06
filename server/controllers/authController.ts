import { Request, Response } from "express";
import { auth } from "../../config/auth";
import { ApiError } from "../middleware/errorHandler";
import { sendResponse } from "../utils/response";

export const authController = {
  // BetterAuth handles most of this via its own handler, 
  // but we can wrap it or add custom logic if needed.
  // For now, let's expose the BetterAuth handler for Express.
  
  handleAuth: async (req: Request, res: Response) => {
    return await auth.handler(req);
  },

  getCurrentUser: async (req: Request, res: Response) => {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      throw new ApiError(401, "Not authenticated");
    }
    sendResponse(res, 200, true, "User session retrieved", session);
  }
};
