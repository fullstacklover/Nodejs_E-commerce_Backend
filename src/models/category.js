import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
       
    }, { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;