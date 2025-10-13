import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
const authHeader = req.headers['authorization'] || req.headers['Authorization']; 
if (authHeader && authHeader.toString().trim().startsWith("Bearer ")) {
    try {
        token = authHeader.trim().split(" ")[1];
        console.log("Token received after split:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.log("error : ", error);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
}
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }
    else {
        res.status(401);
        throw new Error("Not authrized as an admin");
    }
};

export {protect, admin};