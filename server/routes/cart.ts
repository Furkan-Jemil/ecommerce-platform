import { Router } from "express";
import * as cartController from "../controllers/cartController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", cartController.getCart);
router.post("/items", cartController.addItemToCart);
router.put("/items/:id", cartController.updateCartItem);
router.delete("/items/:id", cartController.removeCartItem);
router.delete("/", cartController.clearCart);

export default router;
