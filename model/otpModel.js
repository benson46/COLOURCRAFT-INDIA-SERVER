import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },email:{
            type:String,
            required:true,
            lowercase:true
        },password:{
            type:String,
            required:true
        },hashedOtp:{
            type:String,
            required:true
        },resendCount:{
            type:Number,
            default:0,
        },createdAt:{
            type:Date,
            default:Date.now
        }
    }
)

OTPSchema.index({createdAt:1},{expireAfterSeconds:86400 })

export default mongoose.model("Otp",OTPSchema);