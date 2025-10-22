import express from "express";

const router = express.Router();

import { getProducts, getProductById, createProduct, updateProduct,  deleteProduct, } from "../controllers/productController.js";
import {protect, admin} from "../middleware/authMiddleware.js";


// router.get("/:id", (req, res) => {
//     res.send(`Get product with id ${req.params.id}`);
// });
// GET /api/products   -> public
router.route("/").get(getProducts).post(protect, admin, createProduct );


// GET /api/products   -> public

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
router.route("/:id").delete(protect, admin, deleteProduct); // ✅ Delete product

// router
//   .route("/:id")
//   .get(getProductById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

export default router;