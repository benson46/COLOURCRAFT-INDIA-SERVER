import { adminUserServices } from "../../services/admin/adminUserServices.js";

/**
 * ADMIN USER MANAGEMENT CONTROLLER
 * @desc    Handles listing users and updating user status
 * @access  Private
 */

export const adminUserMangement = {

  /**
   * @function  fetchUsers
   * @desc      Fetch all registered users
   */
  fetchUsers: async (req, res, next) => {
    try {
      const users = await adminUserServices.findAllUser();
      return res.status(200).json({
        success: true,
        message: "Fetched users successfully",
        users,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * @function  tooglingUser
   * @desc      Block or Unblock user
   */
  tooglingUser: async (req, res, next) => {
    try {
      const updatedUser = await adminUserServices.toogleUser(req.params.email);
      return res.status(200).json({
        success: true,
        message: "User status updated successfully",
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  },
};
