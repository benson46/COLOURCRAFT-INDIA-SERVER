import { env } from "../../config/env.js";
import { adminAuthServices } from "../../services/admin/adminAuthServices.js";

/**
 * ADMIN AUTH CONTROLLER
 * @desc   Handles Admin Login
 * @access Private
 */
export const adminAuthController = {
  /**
   * @function login
   * @route   POST /api/admin/login
   * @desc    Authenticates admin and sets access/refresh tokens
   */
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body || {};

      const { admin, adminAccessToken, adminRefreshToken } =
        await adminAuthServices.loginAdmin(email, password);

      // Set access token (15 mins)
      res.cookie("adminAccessToken", adminAccessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax", // use 'none' in production
        maxAge: 15 * 60 * 1000,
      });

      // Set refresh token (7 days)
      res.cookie("adminRefreshToken", adminRefreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax", // use 'none' in production
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Admin Login Successfully",
        admin,
      });
    } catch (error) {
      next(error);
    }
  },
};
