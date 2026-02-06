import { Router } from "express";
import type { Request, Response } from "express";
import { imagekit } from "../../config/imagekit";
import { authMiddleware, adminMiddleware } from "../middleware/auth";
import { sendResponse } from "../utils/response";

const router = Router();

router.get("/auth", authMiddleware, adminMiddleware, (req: Request, res: Response) => {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        sendResponse(res, 200, true, "Authentication parameters retrieved", authenticationParameters);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
});

export default router;
