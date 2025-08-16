import { adminUserServices } from "../../services/admin/adminUserServices.js";

/**
 * ADMIN USER MANAGEMENT CONTROLLER
 * @desc    Handles listing users and updating user status
 * @access  Private
 */

export const adminUserMangement = {
  /** Fetch Users
   *  @desc      Fetch all registered users
   */
  fetchUsers: async (req, res, next) => {
    try {
      const { search, status, page, limit } = req.query;
      const result = await adminUserServices.findAllUser({
        search,
        status,
        page,
        limit,
      });

      console.log("Fetched users:", result);

      return res.status(200).json({
        success: true,
        message: "Fetched users successfully",
        users: result.users,
        total: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        activeCount: result.activeCount, 
        blockedCount: result.blockedCount,
      });
    } catch (error) {
      next(error);
    }
  },

  /** Toogle User Status
   *  @desc      Toogle Block/Unblock user
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
