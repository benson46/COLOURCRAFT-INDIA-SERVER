import { productRepository } from "../../repositories/productRepository.js";

export const userProductServices = {
  fetchProducts: async (filters = {}, sort = {}, page = 1, limit = 10) => {
    try {
      const skip = (page - 1) * limit;
      const { products, totalCount } = await productRepository.findAllProducts(
        filters,
        sort,
        skip,
        limit
      );
      return { products, totalCount };
    } catch (error) {
      throw error;
    }
  },
  fetchProductById: async (productId) => {
    try {
      return await productRepository.findById(productId);
    } catch (error) {
      throw error;
    }
  },
};
