import userModel from "../models/user.js";
import tokenModel from "../models/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../config/mailer.js";
import { validationResult } from "express-validator";


class authController {

    Login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials !"
                });
            }

            const correctpass = await bcrypt.compare(
                password,
                user.password
            );

            if (!correctpass) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials !"
                });
            }

            const accessToken = jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: "24h"
                }
            );

            const refreshToken = jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.REFRESH_TOKEN,
                {
                    expiresIn: "60d"
                }
            );

            const token = await tokenModel.findOne({
                userId: user.id
            });

            if (token) {
                await token.deleteOne();
            }

            await new tokenModel({
                userId: user.id,
                accessToken,
                refreshToken
            }).save();

            user.password = undefined;

            return res.status(200).json({
                success: true,
                user
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    };


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

            const {
                username,
                email,
                password,
                phone
            } = req.body;

            const existUser = await userModel.findOne({
                $or: [
                    { username },
                    { email },
                    { phone }
                ]
            });

            if (existUser) {
                const field =
                    existUser.username === username
                        ? "Username"
                        : existUser.email === email
                            ? "Email"
                            : "Phone number";

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
            const { email } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email doesn't exist!"
                });
            }

            const otpCode = Math.floor(
                1000 + Math.random() * 9000
            );

            const otpExpiration = Date.now() + 10 * 60 * 1000;

            const response = await sendMail(
                email,
                "Your OTP Code",
                `Your OTP code is: ${otpCode}`
            );

            if (response.statusCode === 200) {
                user.otpCode = otpCode;
                user.otpExpiration = otpExpiration;

                await user.save();
            }

            return res.status(response.statusCode).json({
                success: response.statusCode === 200,
                message: response.message
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    };


    checkOtp = async (req, res) => {
        try {
            const { email, otpCode } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email doesn't exist!"
                });
            }

            if (!user.otpCode || !user.otpExpiration) {
                return res.status(400).json({
                    success: false,
                    message: "No OTP requested"
                });
            }

            if (Date.now() > user.otpExpiration) {
                return res.status(400).json({
                    success: false,
                    message: "OTP has expired"
                });
            }

            if (Number(otpCode) !== Number(user.otpCode)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP code"
                });
            }

            return res.status(200).json({
                success: true,
                message: "OTP verified successfully"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    };


    resetPassword = async (req, res) => {
        try {
            const {
                email,
                otpCode,
                newPassword
            } = req.body;

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email doesn't exist !"
                });
            }

            if (!user.otpCode || !user.otpExpiration) {
                return res.status(400).json({
                    success: false,
                    message: "No OTP requested"
                });
            }

            if (Date.now() > user.otpExpiration) {
                return res.status(400).json({
                    success: false,
                    message: "OTP has expired"
                });
            }

            if (Number(otpCode) !== Number(user.otpCode)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP code"
                });
            }

            const hashedPassword = await bcrypt.hash(
                newPassword,
                10
            );

            user.password = hashedPassword;

            user.otpCode = undefined;
            user.otpExpiration = undefined;

            await user.save();

            await tokenModel.deleteMany({
                userId: user.id
            });

            return res.status(200).json({
                success: true,
                message: "Password reset successfully !"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message
            });
        }
    };
}


export default new authController();