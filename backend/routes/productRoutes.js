import express from "express";

const router = express.Router();

import { getProducts, getProductById, createProduct, updateProduct } from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

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

router.route("/").get(getProducts).post(protect, )


export default router;