import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";


class authController {

    Login = async (req, res) => {
        try {
            const users = await userModel.find({});

            return res.status(200).json({
                success: true,
                users
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }


    Register = async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array().map(error => ({
                        field: error.path,
                        message: error.msg
                    }))
                });
            }

            const { username, email, password, phone } = req.body;

            const existUser = await userModel.findOne({
                $or: [{ username }, { email }, { phone }]
            });

            if (existUser) {
                const field = existUser.username === username ? "Username"
                    : existUser.email === email ?
                        "Email" : "Phone number";

                return res.status(409).json({
                    success: false,
                    message: `${field} already exists`
                });
            }

            const hashed = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                username,
                email,
                phone,
                password: hashed
            });

            await newUser.save();
            
            return res.status(201).json({
                success: true,
                message: "User registered successfully"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    };


    checkEmail = async (req, res) => {
        try {


        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }


    checkOtp = async (req, res) => {
        try {


        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }


    forgetPassword = async (req, res) => {
        try {


        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }


    resetPassword = async (req, res) => {
        try {


        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }
}


export default new authController();