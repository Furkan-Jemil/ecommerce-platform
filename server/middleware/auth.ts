import type { Request, Response, NextFunction } from "express";
import { auth } from "../../config/auth";
import { sendResponse } from "../utils/response";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (!session) {
        return sendResponse(res, 401, false, "Unauthorized: No active session");
    }

    (req as any).user = session.user;
    (req as any).session = session.session;
    next();
};

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== "ADMIN") {
        return sendResponse(res, 403, false, "Forbidden: Admin access required");
    }

    next();
};
