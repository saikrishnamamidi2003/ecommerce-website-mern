import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async ( req, res) => {
    const {OrderItems, shippingAddress, paymentMethod, totalPrice} = req.body;

    if(!OrderItems || OrderItems.length === 0){
        res.status(400);
        throw new Error("no order items");
    }

    const order = new Order({
        user: req.user._id,
        OrderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);

});

//@desc get order by Id
//@route get  /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(order){
        if(order.user._id.toString() === req.user._id.toString() || req.user.isAdmin){
            res.json(order);
        }
        else {
            res.status(401);
            throw new Error("Not authorized to view this order");
        }
    }
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, getMyOrders };