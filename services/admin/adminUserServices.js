import { userRepository } from "../../repositories/usersRepository.js";
import createError from "../../utils/createError.js";
import { isValidEmail } from "../../utils/validators.js";

/**
 * ADMIN USER MANAGEMENT SEERVICES
 * @desc    Handles fetching and status toogling of users
 */
export const adminUserServices = {
  /**
   * @function findAllCategory
   * @desc     Fetch all users
   */
  findAllUser: async () => {
    try {
      const users = await userRepository.findAllUserForAdmin();
      return users;
    } catch (error) {}
  },

  /**
   * @function  toogleUser
   * @desc      Update user status
   */
  toogleUser: async (email) => {
    try {
      const validEmail = isValidEmail(email);
      if(!validEmail){
        throw createError.BadRequest('Invalid Email')
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
