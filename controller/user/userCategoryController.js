import {userCategoryServices} from '../../services/user/userCategoryServices.js';

export const userCategoryController = {
    fetchingCategories: async (req,res,next)=>{
        try {
            const categories = await userCategoryServices.fetchCategories();
            return res.status(200).json({success:true,message:"All categories fetch successful",categories});
        } catch (error) {
            next(error);
        }
    }
}