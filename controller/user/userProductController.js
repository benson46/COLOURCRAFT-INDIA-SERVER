import { userProductServices } from "../../services/user/userProductServices.js"

export const userProductController = {
    fetchingProducts: async(req,res,next) =>{
        try {
            const products = await userProductServices.fetchProducts();
            return res.status(200).json({success:true,message:"All products fetch successful",products})
        } catch (error) {
            next(error)
        }
    }
}