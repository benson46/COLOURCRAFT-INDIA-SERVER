import Category from "../model/categoryModel.js";
import createError from "../utils/createError.js";
export const categoryRepository = {
  findCategoryByTitle: async (title) => {
    try {
      return await Category.findOne({ title });
    } catch (error) {
      throw createError.Internal("Database Error occurs while fethicng title");
    }
  },
  newCategory: async(title) =>{
    try {
        return await Category.create({title});
    } catch (error) {
        throw createError.Internal("Databse Error occurs while creating new category");
    }
  },
  findAllCategory: async()=>{
    try {
        return await Category.find();
    } catch (error) {
        createError.Internal("Database error while Fetching categories")
    }
  }
};
