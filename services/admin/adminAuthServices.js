import argon2 from "argon2";
import createError from "../../utils/createError.js";
import { userRepository } from "../../repositories/usersRepository.js";
import { isValidEmail, isValidPassword } from "../../utils/validators.js";
import { adminTokenCreation } from "../../utils/jwt.js";

/**
 * ADMIN AUTH SERVICES
 * @desc Handles admin authentication, including login and token generation
 */
export const adminAuthServices = {
  /**
   * @function loginAdmin
   * @desc    Validates credentials, authenticates admin, and issues tokens
   */
  loginAdmin: async (email, password) => {
    try {
      // Basic input validation
      if (!isValidEmail(email) || !isValidPassword(password)) {
        const error = createError.BadRequest("Invalid email or password");
        error.details = {
          suggestion: "Try resetting your password or try again.",
          errType: "INVALID_CREDENTIALS",
        };
        throw error;
      }

      // Fetch admin by email
      const admin = await userRepository.findAdminWithEmail(email);
      if (!admin) {
        const error = createError.BadRequest("Invalid email or password");
        error.details = {
          suggestion: "Try resetting your password or try again.",
          errType: "INVALID_CREDENTIALS",
        };
        throw error;
      }

      // Verify password
      const verifyPassword = await argon2.verify(admin.password, password);
      if (!verifyPassword) {
        const error = createError.BadRequest("Invalid email or password");
        error.details = {
          suggestion: "Try resetting your password or try again.",
          errType: "INVALID_CREDENTIALS",
        };
        throw error;
      }

      // Generate JWT tokens
      const { getAdminAccessToken, getAdminRefreshToken } = adminTokenCreation(admin);
      const adminAccessToken = getAdminAccessToken();
      const adminRefreshToken = getAdminRefreshToken();

      return {
        admin: {
          email: admin.email,
          role: admin.role,
        },
        adminAccessToken,
        adminRefreshToken,
      };
    } catch (error) {
      throw error;
    }
  },
};
