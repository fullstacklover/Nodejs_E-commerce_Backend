import nodemailer from "nodemailer";

export const sendMail = async (
    email,
    subject,
    body
) => {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body
    };

    try {
        await transporter.sendMail(mailOptions);

        return {
            message: "OTP code sent to your email",
            statusCode: 200
        };

    } catch (error) {
        return {
            message: "Error sending code",
            statusCode: 500
        };
    }
};