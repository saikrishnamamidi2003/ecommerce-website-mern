import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const router = express.Router();
//generating jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30",
    });
}; 


// @desc    Register new user
// @route   POST /api/users/register
// @access  Public

router.post("/register", asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User allready exists");
    }

    const user = await User.create({name , email, password});

    if(user){ 
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}
));

// @desc    Login user
// @route   POST /api/users/login
// @access  Public

router.post(
    "/login",
    asyncHandler(async (req, res)=> {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),

            });
        }
        else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    })
);

export default router;
