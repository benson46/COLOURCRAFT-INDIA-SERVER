import Product from "../model/productModel.js";
import createError from "../utils/createError.js";


export const productRepository = {
  // Find product by title
  findByTitle: async (title) => {
    try {
      return await Product.findOne({ title });
    } catch (error) {
      throw createError.Internal(
        "Database error occur while fetching a product"
      );
    }
  },

  // Find product by Id
  findById: async (_id) => {
    try {
      return await Product.findById(_id);
    } catch (error) {
      throw createError.Internal("Database error while fetching product");
    }
  },

  // Create new product
  newProduct: async (data) => {
    try {
      const product = new Product({
        title: data.title,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        images: data.images,
      });

      return await product.save();
    } catch (error) {
      console.error(error);
      throw createError.Internal(
        "Database error occured while creating new product"
      );
    }
  },

  // Find all Products
  findAllProducts: async (query = {}, sort = {}, skip = 0, limit = 10) => {
    try {
      const products = await Product.find(query)
        .populate("category")
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const totalCount = await Product.countDocuments(query);
      return {products,totalCount}
    } catch (error) {
      throw createError.Internal("Database error while fetching products");
    }
  },

  // Toogle product status block/unblock
  toogleStatusProduct: async (product) => {
    try {
      console.log("heyya", product);
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        { $set: { isBlocked: !product.isBlocked } },
        { new: true }
      );
      if (!updatedProduct) {
        throw createError.NotFound("Product not found");
      }
      return updatedProduct;
    } catch (error) {
      throw createError.Internal(
        "Database error while updating product status"
      );
    }
  },

  // Edit product
  updateProduct: async (id, updateData) => {
    try {
      return await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).populate("category");
    } catch (error) {
      throw error;
    }
  },
};
