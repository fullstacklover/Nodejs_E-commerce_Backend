import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    street : String,
    apartment : String,
    city : String,
    postalCode : String,
    country : String,
    phone : {
        type : String,
        required : true
    },
    otpCode : Number,
    otpExpiration : Date,
    wishlist : {
        productId : {
            type : Schema.Types.ObjectId,
            ref : "products",
            required : true
        },
        productName : {
            type : String,
            required : true
        },
        productImg : {
            type : String,
            required : true
        },
        productPrice : {
            type : Number,
            required : true
        },
    }
},{ timestamps : true });


const userModel = mongoose.model("users", userSchema);
export default userModel;