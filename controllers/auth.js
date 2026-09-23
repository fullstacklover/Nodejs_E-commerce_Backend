import userModel from "../models/user.js";


class authController {

    Login = async (req, res) => {
        try {
            const users = await userModel.find({});

            return res.status(200).json({
                success : true,
                users
            });

        } catch (err) {
            return res.status(500).json({
                success : false,
                error : err.message
            }) 
        }
    }


    Register = async (req, res) => {
        try {
          

        } catch (err) {
            return res.status(500).json({
                success : false,
                error : err.message
            }) 
        }
    }


    checkEmail = async (req, res) => {
        try {
          

        } catch (err) {
            return res.status(500).json({
                success : false,
                error : err.message
            }) 
        }
    }


    checkOtp = async (req, res) => {
        try {
          

        } catch (err) {
            return res.status(500).json({
                success : false,
                error : err.message
            }) 
        }
    }


    forgetPassword = async (req, res) => {
        try {
          

        } catch (err) {
            return res.status(500).json({
                success : false,
                error : err.message
            }) 
        }
    }


    resetPassword = async (req, res) => {
        try {
          

        } catch (err) {
            return res.status(500).json({
                success : false,
                error : err.message
            }) 
        }
    }
}


export default new authController();