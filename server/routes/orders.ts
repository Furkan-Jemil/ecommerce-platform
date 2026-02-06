import { Router } from "express";
import * as orderController from "../controllers/orderController";
import { authMiddleware, adminMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);

// Admin only
router.put("/:id/status", adminMiddleware, orderController.updateOrderStatus);

export default router;
