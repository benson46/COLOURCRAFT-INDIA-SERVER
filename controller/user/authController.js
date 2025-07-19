import { env } from "../../config/env.js";
import { authServices } from "../../services/user/authServices.js";
import createError from "../../utils/createError.js";

/* 
USER AUTH CONTROLLER 
@desc   Handles user initial register to login 
@access PUBLIC
*/
export const authController = {
  initiateRegister: async (req, res, next) => {
    try {
      const { name, email, password, agreeToTerms } = req.body || {};
      // Basic validation
      switch (true) {
        case !name:
          throw createError.BadRequest("Name is required");
        case !email:
          throw createError.BadRequest("Email is required");
        case !password:
          throw createError.BadRequest("Password is required");
        case !agreeToTerms:
          throw createError.BadRequest("Please agree to the terms");
        default:
          break; // all validations passed
      }

      await authServices.initiatingRegister(name, email, password);
      return res.status(200).json({
        success: true,
        message: "OTP send successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  verifyOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp)
        throw createError.BadRequest("Invalid or expired OTP");
      await authServices.verifyUserOtp(email, otp); // Verify user OTP
      const registeruser = await authServices.registerUser(email);
      return res.status(200).json({
        success: true,
        message: "OTP verification successsful",
        registeruser,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) throw createError.BadRequest("Email is required");
      if (!password) throw createError.BadRequest("Password is required");

      const { user, accessToken, refreshToken } = await authServices.loginUser(
        email,
        password
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax", // change to none in production
        maxAge: 30 * 60 * 1000, // 30 minutes
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax", // change to none in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
      });

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
