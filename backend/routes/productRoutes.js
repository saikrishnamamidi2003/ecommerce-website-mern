import express from "express";

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get("/", (req, res) => {
    res.send("Get all products");
});

//@desc get single product by Id
//@route get  /api/products/:id
//@access public

router.get("/:id", (req, res) => {
    res.send(`Get product with id ${req.params.id}`);
});

export default router;