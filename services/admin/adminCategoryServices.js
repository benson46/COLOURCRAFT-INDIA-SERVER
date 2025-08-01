import { categoryRepository } from "../../repositories/categoryRepository.js";
import createError from "../../utils/createError.js";
import { isValidTitle } from "../../utils/validators.js";

/**
 * ADMIN CATEGORY SERVICES
 * @desc    Handles fetching, adding, status toggling, and editing of categories
 */
export const adminCategoryServices = {
//  Fetch all categories
  getAllCategory: async () => {
    try {
      return await categoryRepository.findAllCategory();
    } catch (error) {
      throw error;
    }
  },

  // Add new category
  addNewCategory: async (title, status) => {
    try {
      // Basic  validation
      const trimmedTitle = title.trim();
      const validateError = isValidTitle(trimmedTitle);
      if (validateError) throw createError.BadRequest(validateError);

      // Check for duplicate category title
      const existingTitle = await categoryRepository.findCategoryByTitle(trimmedTitle);
      if (existingTitle) {
        const error = createError.Conflict("This category already exists");
        error.details = {
          suggestion: "Change the title",
          errType: "DUPLICATE_TITLE",
        };
        throw error;
      }

      return  await categoryRepository.newCategory(trimmedTitle, status);
      
    } catch (error) {
      throw error;
    }
  },

  // Toogle category status block/unblock
  updateCategoryStatus: async (_id, status) => {
    try {
      return await categoryRepository.updateStatus(_id, status);
    } catch (error) {
      throw error;
    }
  },

  // Update category data
  editCategory: async (_id, title) => {
    try {
      // Basic validation
      const validateError = isValidTitle(title);
      if (validateError) throw createError.BadRequest(validateError);

      const trimmedTitle = title.trim();

      // Check for duplicate title
      const existingTitle = await categoryRepository.findCategoryByTitle(trimmedTitle);
      if (existingTitle) {
        const error = createError.Conflict("This category already exists");
        error.details = {
          suggestion: "Change the title",
          errType: "DUPLICATE_TITLE",
        };
        throw error;
      }

      const editedCategory = await categoryRepository.updateCategoryTitle(_id, trimmedTitle);
      return editedCategory;
    } catch (error) {
      throw error;
    }
  },
};
