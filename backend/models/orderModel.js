import mongoose, { mongo } from "mongoose";

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongo.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                name: { type: String, required: true },
                qty: {type: Number, required: true},
                
            }
        ]
    }
)