import { adminCategoryServices } from "../../services/admin/adminCategoryServices.js";
import createError from "../../utils/createError.js";

export const adminCategoryController = {
  gettingAllCategory: async (req,res,next) => {
    try {
        const categories = await adminCategoryServices.getAllCategory();
        return res.status(200).json({success:"true",message:"Fetch all categories succesfully",categories})
    } catch (error) {
        next(error)
    }
  },

  addingNewCategory: async (req, res, next) => {
    try {
      if (!req.body) throw createError.BadRequest("Enter all the filed");
      const newCategory = await adminCategoryServices.addNewCategory(
        req.body.title
      );
      return res.status(201).json({
        success: true,
        message: "New category create successful",
        newCategory,
      });
    } catch (error) {
      next(error);
    }
  },
};
