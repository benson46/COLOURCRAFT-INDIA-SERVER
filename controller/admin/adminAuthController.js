import { env } from "../../config/env.js";
import { adminAuthServices } from "../../services/admin/adminAuthServices.js";

/* 
ADMIN AUTH CONTROLLER 
@desc   Handles ADMIN Login 
@access PRIVATE
*/
export const adminAuthController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body || {};
      const { admin, adminAccessToken, adminRefreshToken } =
        await adminAuthServices.loginAdmin(email, password);

      res.cookie("adminAccessToken", adminAccessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15  * 60 * 1000,
      });

      res.cookie("adminRefreshToken", adminRefreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7*24*60*60 * 1000, 
      });

      return res
        .status(200)
        .json({ success: true, message: "Admin Login Successfully", admin });
    } catch (error) {
      next(error);
    }
  },
};
