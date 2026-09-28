import express from "express";
import authController from "../../controllers/auth.js";
import { registerValidator } from "../../validators/auth.js";

const authRouter = express.Router();

authRouter.post("/login", authController.Login);

authRouter.post("/register", 
                registerValidator, 
                authController.Register
);

authRouter.post("/check/email", authController.checkEmail);

authRouter.post("/check/otp", authController.checkOtp);

authRouter.post("/password/reset", authController.resetPassword);


export default authRouter;