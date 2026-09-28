import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        otpCode: {
            type: Number,
        },
        otpExpiration: {
            type: Date,
        },
        wishlist: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
            },
        ],
    }, { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;