import express from "express";
const router = express.Router();

import { addOrderItems,getOrderById, getMyOrders  } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post("/", (req, res) => {
  res.send("Create new order");
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", (req, res) => {
  res.send(`Get order with id ${req.params.id}`);
});

router.post("/", protect, addOrderItems);
router.get("/myorders",protect, getMyOrders);
router.get("/:id", protect, getMyOrders);

export default router;
