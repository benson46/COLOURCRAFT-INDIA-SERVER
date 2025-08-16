import { userRepository } from "../../repositories/usersRepository.js";
import createError from "../../utils/createError.js";
import { isValidEmail } from "../../utils/validators.js";

/**
 * ADMIN USER MANAGEMENT SEERVICES
 * @desc    Handles fetching and status toogling of users
 */
export const adminUserServices = {
  // Fetch all users
  findAllUser: async (queryParams) => {
    try {
      const { search, status, page, limit } = queryParams;
      const result = await userRepository.findAllUsersForAdmin({
        search,
        status,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
      });

      // Get counts
      const activeCount = await userRepository.countUsers({ status: "Active" });
      const blockedCount = await userRepository.countUsers({
        status: "Blocked",
      });

      return {
        ...result,
        activeCount,
        blockedCount,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw createError.Internal("Database error while fetching users");
    }
  },

  // Toogle user status block/unblock
  toogleUser: async (email) => {
    try {
      const validEmail = isValidEmail(email);
      if (!validEmail) {
        throw createError.BadRequest("Invalid Email");
      }
      const user = await userRepository.findUserByEmail(email);
      user.status = user.status === "Active" ? "Blocked" : "Active";

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  },
};
