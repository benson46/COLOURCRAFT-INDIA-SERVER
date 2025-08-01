import Product from "../model/productModel.js";
import createError from "../utils/createError.js";

export const productRepository = {
  findByTitle: async (title) => {
    try {
      return await Product.findOne({ title });
    } catch (error) {
      throw createError.Internal(
        "Database error occur while fetching a product"
      );
    }
  },
  findById: async (_id) => {
    try {
      return await Product.findById(_id);
    } catch (error) {
      throw createError.Internal("Database error while fetching product");
    }
  },
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
  findAllProducts: async () => {
    try {
      return await Product.find().populate('category');
    } catch (error) {
      throw createError.Internal("Database error while fetching products");
    }
  },
  toogleStatusProduct: async (product) => {
    try {
      console.log("heyya", product);
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        { $set: { isBlocked: !product.isBlocked } },
        { new: true }
      )
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
  updateProduct: async (id, updateData) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('category');
  } catch (error) {
    throw error;
  }
}
};
