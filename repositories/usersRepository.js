import User from "../model/userModel.js";
import createError from "../utils/createError.js";

// Repository for handling user database
export const userRepository = {
  /**
   * Find user by id
   */
  findUserById: async (id) => {
    try {
      return await User.findById(id).select("-password");
    } catch (error) {
      console.error("Error finding user by email userRepository:", error);
      throw createError.Internal("Database error while finding user by email.");
    }
  },

  /**
   * Find user by email(-password)
   */
  findUserByEmail: async (email) => {
    try {
      return await User.findOne({ email }).select("-password");
    } catch (error) {
      console.error("Error finding user by email userRepository:", error);
      throw createError.Internal("Database error while finding user by email.");
    }
  },

  /**
   * Find user by email (+password)
   */
  findUserByEmailWithPassword: async (email) => {
    try {
      return await User.findOne({ email }).select("+password");
    } catch (error) {
      console.error("Error finding user by email userRepository: ", error);
      throw createError.Internal("Database error while finding user by email");
    }
  },

  /**
   * Create the new user 
   */
  createUser: async (name, email, password, createdAt) => {
    try {
      return await  User.create({ name, email, password, createdAt });
    } catch (error) {
      console.error("Error creating new user userRepository: ", error);
      throw createError.Internal("Database error while creating new user");
    }
  },

  /**
   * Find admin with email
   */
  findAdminWithEmail: async (email) => {
    try {
      const admin = await User.findOne({ email });

      if (!admin || admin.role !== "admin") {
        const error = createError.Unauthorized("Invalid email or password");
        error.details = {
          suggestion: "Try Contact Technical Support in case of forgotten credentials",
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

  /**
   * Find admin with id
   */
  findAdminWithId:async(_id)=>{
    try {
     const admin =  await User.findById(_id).select("-password")
     if(admin.role !== "admin"){
      const error = createError.Unauthorized("Invalid Admin")
      throw error
     }
    } catch (error) {
      throw createError.Internal("Error while fetching admin userRepository: ",error)
    }
  },

  /**
   * Find all users for admin only
   */
  findAllUserForAdmin: async () => {
    try {
      return await User.find().select("-password");
    } catch (error) {
      console.error("Error while fetching all users userRepository : ", error);
      throw createError.Internal("Error while fetching users");
    }
  },
};
