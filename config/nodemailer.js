import nodemailer from 'nodemailer';
import { env } from './env.js';
import createError from '../utils/createError.js';

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:env.APP_USERNAME,
        pass:env.APP_PASSWORD
    }
})

 const sendMail = async(toEmail,subject,html)=>{
    const mailOptions = {
        from: "alan",
        to: toEmail,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        return 'sent'
    } catch (error) {
        console.log("Error sending mail: ", error);
        throw createError.Internal("Server Error While Sending Otp")
    }
}

export default sendMail;