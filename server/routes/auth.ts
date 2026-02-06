import { Router } from "express";
import { authController } from "../controllers/authController";

const router = Router();

// BetterAuth catch-all for /api/auth/*
router.all("/*", async (req, res) => {
  const response = await authController.handleAuth(req, res);
  // BetterAuth handler returns a Response object (Web Standard)
  // We need to pipe it to Express Response
  const headers = Object.fromEntries(response.headers.entries());
  res.set(headers);
  res.status(response.status);
  const data = await response.json();
  res.json(data);
});

export default router;
