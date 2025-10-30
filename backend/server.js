import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

//middleware

app.use(express.json());
app.use(cors());

//Routes
app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.use("/api/payment", paymentRoutes);

//error handling
app.use(notFound);
app.use(errorHandler);

//test route  
app.get("/", (req, res)=>{
    res.send("api is running..");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server running on port ->  ${PORT}`);
});