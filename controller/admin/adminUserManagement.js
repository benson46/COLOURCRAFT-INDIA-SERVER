import { adminUserServices } from "../../services/admin/adminUserServices.js";

export const adminUserMangement = {
    listUsers: async (req,res,next) => {
        try {
            const users =   await adminUserServices.findAllUser();
            return res.status(200).json({success:true,message:"fetch users successfully", users})
        } catch (error) {
            next(error)
        }
    },

    tooglingUser:async (req,res,next)=>{
        try {
            const updatedUser = await adminUserServices.toogleUser(req.params.email);
            return res.status(200).json({success:true,message:"User updated status succcessfully",updatedUser})
        } catch (error) {
            next(error)
        }
    }
}