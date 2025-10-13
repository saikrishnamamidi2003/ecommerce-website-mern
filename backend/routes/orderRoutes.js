import express from "express";
const router = express.Router();



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

export default router;
