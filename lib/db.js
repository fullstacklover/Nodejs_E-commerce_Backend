import mongoose from "mongoose";

export default async function mongoDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw error
    }
}