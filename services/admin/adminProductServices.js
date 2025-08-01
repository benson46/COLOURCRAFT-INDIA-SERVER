import { productRepository } from "../../repositories/productRepository.js";
import createError from "../../utils/createError.js";
/**
 * ADMIN PRODUCT SERVICES
 * @desc Handles add new product
 */

export const adminProductServices = {
  // Add new Product
  addNewProduct: async (data) => {
    try {
      const existingProduct = await productRepository.findByTitle(data.title);
      if (existingProduct) {
        throw createError.Conflict("Product title already exists");
      }
      return await productRepository.newProduct(data);
    } catch (error) {
      throw error;
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    try {
      return await productRepository.findAllProducts();
    } catch (error) {
      throw error;
    }
  },

  // Toogle product status block/unblock
  toogleStatus: async (id) => {
    try {
      const product = await productRepository.findById(id);
      return await productRepository.toogleStatusProduct(product);
    } catch (error) {
      throw error;
    }
  },

  // Edit product  data
  editProduct: async (productData) => {
    try {
      const existingProduct = await productRepository.findByTitle(
        productData.title
      );
      if (
        existingProduct &&
        existingProduct._id.toString() !== productData._id.toString()
      ) {
        throw createError.Conflict("Product title already exists");
      }
      return await productRepository.updateProduct(
        productData._id,
        productData
      );
    } catch (error) {
      throw error;
    }
  },
};
