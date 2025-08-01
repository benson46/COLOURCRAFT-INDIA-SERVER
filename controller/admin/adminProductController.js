import fs from "fs";

import cloudinary from "../../config/cloudinary.js";
import { adminProductServices } from "../../services/admin/adminProductServices.js";
import createError from "../../utils/createError.js";
import { validateProduct } from "../../utils/validators.js";

/**
 * ADMIN PRODUCT CONTROLLER
 * @desc    Handles adding, fetching , status update, and editing of products
 * @access  Private
 */
export const adminProductController = {

  /**
   * @function addingNewProduct
   * @route    POST /api/admin/product
   * @desc
   */
  addingNewProduct: async (req, res, next) => {
    try {
      const imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "admin-products",
          });
          imageUrls.push(result.secure_url);
          fs.unlinkSync(file.path);
        }
      }

      // Add image URLs to request body
      req.body.images = imageUrls;

      // Now validate (includes image validation)
      const validatingProduct = validateProduct(req.body);
      if (!validatingProduct.isValid) {
        throw createError.BadRequest(
          "Validation error: ",
          validatingProduct.errors
        );
      }

      // Create product
      const response = await adminProductServices.addNewProduct(req.body);
      return res.status(201).json({
        success: true,
        message: "Product added successfully",
        response,
      });
    } catch (error) {
      console.error("Product addition error:", error);
      next(error);
    }
  },
  fetchingProducts: async (req, res, next) => {
    try {
      const products = await adminProductServices.fetchProducts();

      return res
        .status(200)
        .json({
          success: true,
          message: "Product fetch successfuly",
          products,
        });
    } catch (error) {
      next(error);
    }
  },
  tooglingStatus: async (req, res, next) => {
    try {
      const product = await adminProductServices.toogleStatus(req.params.id);
      return res
        .status(200)
        .json({
          success: true,
          message: "Update product status success",
          product,
        });
    } catch (error) {
      next(error);
    }
  },
  editingProduct: async (req, res, next) => {
  try {
    // Parse images field ALWAYS
    let imagesArray = req.body.images;
    if (typeof imagesArray === "string") {
      try {
        imagesArray = JSON.parse(imagesArray);
      } catch (err) {
        throw createError.BadRequest("Invalid images format");
      }
    } else if (!Array.isArray(imagesArray)) {
      imagesArray = [];
    }

    const newImageUrls = [];

    // Process new images only if files exist
    if (req.files && req.files.length > 0) {
      // Count placeholders and new images
      const placeholderCount = imagesArray.filter(img => 
        img === "new-image-placeholder"
      ).length;
      
      if (req.files.length !== placeholderCount) {
        throw createError.BadRequest(
          "Mismatch between new images and uploaded files"
        );
      }

      // Upload new images
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "admin-products",
        });
        newImageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }

      // Replace placeholders with Cloudinary URLs
      let placeholderIndex = 0;
      imagesArray = imagesArray.map(img => 
        img === "new-image-placeholder" 
          ? newImageUrls[placeholderIndex++] 
          : img
      );
    }


    // Create clean product data object
    const productData = {
      ...req.body,
      images: imagesArray // Use parsed array
    };

    // Validate using the cleaned data
    const validProduct = validateProduct(productData);
    if (!validProduct.isValid) {
      throw createError.BadRequest(
        "Validation error: " + JSON.stringify(validProduct.errors)
      );
    }

    // Update product
    const editedProduct = await adminProductServices.editProduct(productData);
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: editedProduct,
    });
  } catch (error) {
    console.error("Product update error:", error);
    next(error);
  }
}
};
