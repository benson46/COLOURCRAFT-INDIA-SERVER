import Category from "../model/categoryModel.js";
import createError from "../utils/createError.js";

// Repository for handling all Category-related database operations
export const categoryRepository = {
  /**
   * Find a category by its title
   */
  findCategoryByTitle: async (title) => {
    try {
      return await Category.findOne({ title });
    } catch (error) {
      throw createError.Internal("Database error occurred while fetching category by title");
    }
  },

  /**
   * Create a new category
   */
  newCategory: async (title, status) => {
    try {
      return await Category.create({ title, status });
    } catch (error) {
      throw createError.Internal("Database error occurred while creating new category");
    }
  },

  /**
   * Fetch all categories
   */
  findAllCategory: async () => {
    try {
      return await Category.find();
    } catch (error) {
      throw createError.Internal("Database error occurred while fetching all categories");
    }
  },

  /**
   * Update the status of a category
   */
  updateStatus: async (_id, status) => {
    try {
      if (!["Active", "Inactive"].includes(status)) {
        throw createError.BadRequest("Invalid status value");
      }
      return await Category.updateOne({ _id }, { $set: { status } });
    } catch (error) {
      throw createError.Internal("Database error occurred while updating category status");
    }
  },

  /**
   * Update the title of a category
   */
  updateCategoryTitle: async (_id, title) => {
    try {
      return await Category.findByIdAndUpdate(_id, { $set: { title } }, { new: true });
    } catch (error) {
      throw createError.Internal("Database error occurred while updating category title");
    }
  }
};
