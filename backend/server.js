import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

//middleware

app.use(express.json());
app.use((cors()));

//Routes
app.use("/api/users", userRoutes);

//test route  
app.get("/", (req, res)=>{
    res.send("api is running..");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server running on port ->  ${PORT}`);
});