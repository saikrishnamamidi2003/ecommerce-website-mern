import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Get all products
// @route Get /api/products
//@access public 
const getProducts = asyncHandler(async (req, res)=> {
    const products = await Product.find({});
    res.json(products);
});

//desc get single product by Id
//@route get /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error("Product not found");
    }
});


//@desc create a new product (admin)
//@route post /api/products
//@access private/admin

const createProduct = asyncHandler(async (req, res) => {
     // Accept fields but provide sensible defaults so admin can quickly create
     const {
        name,
        price,
        description,
        image,
        brand, 
        category,
        countInStock,
     } = req.body;

     const product = new Product({
        user: req.user._id,//from auth middleware
        name: name || "Sample name",
        price: price ?? 0,
        description: description || "Sample description",
        image: image || "/images/sample.jpg",
        brand: brand || "Sample brand",
        category: category || "Sample category",
        countInStock: countInStock ?? 0,

     });

     const createdProduct = await product.save();
     res.status(201).json(createProduct);
});


//@desc  update existing product (admin)
//@route put /api/prduct/:id
//@access private/admin

const updateProduct = asyncHandler(async (req, res)=> {
    const {name, price, description, image , brand, category , countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.image = image ?? product.image;
        product.brand = brand ?? product.brand;
        product.category = category ?? product.category;
        product.countInStock = countInStock ?? product.countInStock;


        const updatedProduct = await product.save();
        res.json(updateProduct);
    }
    else {
        res.status(404);
        throw new Error("product not found");
    }
});

export {getProducts, getProductById, createProduct, updateProduct };
