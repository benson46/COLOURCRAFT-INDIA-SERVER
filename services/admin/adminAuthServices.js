import argon2 from "argon2";
import createError from "../../utils/createError.js";
import { userRepository } from "../../repositories/usersRepository.js";
import { isValidEmail, isValidPassword } from "../../utils/validators.js";
import { adminTokenCreation } from "../../utils/jwt.js";

export const adminAuthServices = {
  loginAdmin: async (email, password) => {
    try {

      if (!isValidEmail(email) || !isValidPassword(password)) {
        const error = createError.BadRequest("Invalid email or password");
        error.details = {
          suggestion: "Try reseting your password or try again.",
          errType: "INVALID_CREDINTIALS",
        };
        throw error;
      }

      const admin = await userRepository.findAdminWithEmail(email);
      const verifyPassword = await argon2.verify(admin.password, password);
      if (!admin || !verifyPassword) {
        const error = createError.BadRequest("Invalid email or password");
        error.details = {
          suggestion: "Try reseting your password or try again.",
          errType: "INVALID_CREDINTIALS",
        };
        throw error;
      }

      const {getAdminAccessToken,getAdminRefreshToken} = adminTokenCreation(admin);
      const adminAccessToken = getAdminAccessToken();
      const adminRefreshToken = getAdminRefreshToken();
      
      return { admin:{email: admin.email, role: admin.role }, adminAccessToken,adminRefreshToken};
    } catch (error) {
      throw error;
    }
  },
};
