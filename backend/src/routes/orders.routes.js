import { Router } from "express";
import { getOrderBySession, lookupOrder } from "../controllers/orders.controller.js";

const router = Router();

router.get("/lookup", lookupOrder);
router.get("/session/:sessionId", getOrderBySession);

export default router;