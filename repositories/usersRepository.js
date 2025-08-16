import User from "../model/userModel.js";
import createError from "../utils/createError.js";

// Repository for handling user database
export const userRepository = {
  // Find user by Id (-password)
  findUserById: async (id) => {
    try {
      return await User.findById(id).select("-password");
    } catch (error) {
      console.error("Error finding user by email userRepository:", error);
      throw createError.Internal("Database error while finding user by email.");
    }
  },

  // Find user by email(-password)
  findUserByEmail: async (email) => {
    try {
      return await User.findOne({ email }).select("-password");
    } catch (error) {
      console.error("Error finding user by email userRepository:", error);
      throw createError.Internal("Database error while finding user by email.");
    }
  },

  // Find user by email (+password)
  findUserByEmailWithPassword: async (email) => {
    try {
      return await User.findOne({ email }).select("+password");
    } catch (error) {
      console.error("Error finding user by email userRepository: ", error);
      throw createError.Internal("Database error while finding user by email");
    }
  },

  // Create new user
  createUser: async (name, email, password, createdAt) => {
    try {
      return await User.create({ name, email, password, createdAt });
    } catch (error) {
      console.error("Error creating new user userRepository: ", error);
      throw createError.Internal("Database error while creating new user");
    }
  },

  // Find admin with email
  findAdminWithEmail: async (email) => {
    try {
      const admin = await User.findOne({ email });

      if (!admin || admin.role !== "admin") {
        const error = createError.Unauthorized("Invalid email or password");
        error.details = {
          suggestion:
            "Try Contact Technical Support in case of forgotten credentials",
          errType: "INVALID_CREDENTIALS",
        };
        throw error;
      }

      return admin;
    } catch (error) {
      console.error("Error while fetching admin userRepository:", error);
      if (error.status && error.details) {
        throw error;
      }
      throw createError.Internal("Error while fetching admin");
    }
  },

  // Find admin with id
  findAdminWithId: async (_id) => {
    try {
      const admin = await User.findById(_id).select("-password");
      if (admin.role !== "admin") {
        const error = createError.Unauthorized("Invalid Admin");
        throw error;
      }
    } catch (error) {
      throw createError.Internal(
        "Error while fetching admin userRepository: ",
        error
      );
    }
  },

countUsers: async (filters = {}) => {
  try {
    return await User.countDocuments(filters);
  } catch (error) {
    console.error("Error counting users: ", error);
    throw createError.Internal("Error while counting users");
  }
},

// Update this method
findAllUsersForAdmin: async (filters = {}) => {
  try {
    const { search, status, page = 1, limit = 10 } = filters;

    // Build query object
    const query = {};

    // Status filter
    if (status && status !== "All") {
      query.status = status;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } } // Make phone search case-insensitive too
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await User.countDocuments(query);

    return {
      users,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    console.error("Error while fetching users: ", error);
    throw createError.Internal("Error while fetching users");
  }
},
};
