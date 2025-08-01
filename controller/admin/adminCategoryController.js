import { adminCategoryServices } from "../../services/admin/adminCategoryServices.js";
import createError from "../../utils/createError.js";

/**
 * ADMIN CATEGORY CONTROLLER
 * @desc    Handles adding, fetching, status update, and editing of categories
 * @access  Private
 */
export const adminCategoryController = {

  /**
   * @function addingNewCategory
   * @desc     Add new category
   */
  addingNewCategory: async (req, res, next) => {
    try {
      if (!req.body) throw createError.BadRequest("Enter all the fields");

      const newCategory = await adminCategoryServices.addNewCategory(
        req.body.title,
        req.body.status
      );

      return res.status(201).json({
        success: true,
        message: "New category created successfully",
        newCategory,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @function gettingAllCategory
   * @desc    Get all categories
   */
  fetchingAllCategory: async (req, res, next) => {
    try {
      const categories = await adminCategoryServices.getAllCategory();
      return res.status(200).json({
        success: true,
        message: "Fetched all categories successfully",
        categories,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @function tooglingCategory
   * @route   PATCH /api/admin/category-tootgle-status/:_id
   * @desc    Toggle the status (block/unblock) of a category
   * @access  Private
   */
  tooglingCategory: async (req, res, next) => {
    try {
      const { status } = req.body;
      const { _id } = req.params;

      const updatedCategory = await adminCategoryServices.updateCategoryStatus(
        _id,
        status
      );

      return res.status(200).json({
        success: true,
        message: "Updated category status successfully",
        updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @function editingCategory
   * @route   PATCH /api/admin/category/:id
   * @desc    Edit the title of a category
   * @access  Private
   */
  editingCategory: async (req, res, next) => {
    try {
      const editedCategory = await adminCategoryServices.editCategory(
        req.params.id,
        req.body.title
      );

      return res.status(200).json({
        success: true,
        message: "Updated category title successfully",
        editedCategory,
      });
    } catch (error) {
      next(error);
    }
  },
};
