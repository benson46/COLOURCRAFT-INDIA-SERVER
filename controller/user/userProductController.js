import { userProductServices } from "../../services/user/userProductServices.js";

export const userProductController = {
  // Backend controller
  fetchingProducts: async (req, res, next) => {
    try {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        sortBy,
        page = 1,
        limit = 12,
      } = req.query;

      // Build filter object
      const filters = {};

      if (search) {
        filters.title = { $regex: search, $options: "i" };
      }

      if (category && category !== "All") {
        filters["category.title"] = category;
      }

      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
      }

      // Build sort object
      const sort = {};
      switch (sortBy) {
        case "price-low":
          sort.price = 1;
          break;
        case "price-high":
          sort.price = -1;
          break;
        case "rating":
          sort.rating = -1;
          break;
        default:
          sort.title = 1;
      }

      const result = await userProductServices.fetchProducts(
        filters,
        sort,
        parseInt(page),
        parseInt(limit)
      );

      return res.status(200).json({
        success: true,
        message: "Products fetch successful",
        products: result.products,
        totalCount: result.totalCount,
        totalPages: Math.ceil(result.totalCount / limit),
      });
    } catch (error) {
      next(error);
    }
  },
  fetchingProductById: async (req, res, next) => {
    try {
      const productId = req.params.id;
      const product = await userProductServices.fetchProductById(productId);
      return res.status(200).json({
        success: true,
        message: "Product fetch successful",
        product,
      })
    } catch (error) {
      next(error);
    }
  }
};
