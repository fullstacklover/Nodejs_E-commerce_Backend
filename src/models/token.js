import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 86400
        }
    }
);

const tokenModel = mongoose.model("tokens", tokenSchema);

export default tokenModel;