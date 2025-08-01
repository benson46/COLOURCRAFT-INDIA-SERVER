import argon2 from "argon2";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../utils/validators.js";
import createError from "../../utils/createError.js";
import { userRepository } from "../../repositories/usersRepository.js";
import { OTPRepository } from "../../repositories/otpRepository.js";
import { generateOtp, hashOtp } from "../../utils/otpGeneration.js";
import { sendOtpMail } from "../../utils/sendOtpMail.js";
import { tokenCreation } from "../../utils/jwt.js";

/**
 * USER AUTH SERVICES
 * @desc    Handles temp storage, verify otp, regiester, and login user
 */
export const authServices = {
  /**
   * @function   initiatingRegister
   * @desc       Stores user detials for temperory before sending otp
   */
  initiatingRegister: async (name, email, password) => {
    try {
      // Input Validations
      if (!isValidName(name)) {
        const error = createError.BadRequest("Invalid name");
        error.details = {
          suggestion: "Name must be at least 3 letters, no numbers/symbols",
          errType: "INVALID_NAME",
        };
        throw error;
      }

      if (!isValidEmail(email)) {
        const error = createError.BadRequest("Invalid email");
        error.details = {
          suggestion: "Enter a valid email address",
          errType: "INVALID_EMAIL",
        };
        throw error;
      }

      if (!isValidPassword(password)) {
        const error = createError.BadRequest("Insecure Password");
        error.details = {
          suggestion:
            "Enter a Password with at lease one uppercase , one lowercase , one special character",
          errType: "INSECURE_DATA",
        };
        throw error;
      }

      // Checking For Duplicate user
      const existingUser = await userRepository.findUserByEmail(email);
      if (existingUser) {
        const error = createError.Conflict("User already exist with this email");
        error.details = {
          suggestion: "try login or reset your password.",
          errType: "DUPLICATE_USER",
        };
        throw error;
      }

      // Check Existing User In OTP Database
      const existingOtpUser = await OTPRepository.findUserByEmail(email);
      if (existingOtpUser && existingOtpUser.resendCount >= 4) {  // user can only send 4 otp per 24 hours
        const error = createError.TooManyRequests("Limit of resend occurs");
        error.details = {
          suggestion: "Try again after 24 hours",
          errType: "LIMIT_RESEND_OTP",
        };
        throw error;
      }

      // Hashing Password Securely
      const hashPassword = await argon2.hash(password);
      const resendOtpCount = existingOtpUser? existingOtpUser.resendCount + 1: 1;

      // OTP Generating and Hashing
      const OtpForUser = generateOtp();
      const hashedOtp = hashOtp(OtpForUser);

      // Creating Temp User
      await OTPRepository.createTempUser({
        name,
        email,
        password: hashPassword,
        hashedOtp,
        resendCount: resendOtpCount,
        createdAt: new Date(),
      });

      // Sending OTP to there mail
      await sendOtpMail(email, OtpForUser);
    } catch (err) {
      console.error("Error while initiating register authServices.js:", err);
      throw err;
    }
  },

  /**
   * @function   verifyUserOtp
   * @desc       Verify otp with otp in database
   */
  verifyUserOtp: async (email, otp) => {
    try {
      const hashed = hashOtp(otp);
      const tempUser = await OTPRepository.verifyUserOtpRegistration(email);

      if (!tempUser) {
        throw createError.NotFound("OTP record not found or expired.");
      }
      if (tempUser.hashedOtp !== hashed) {
        throw createError.BadRequest("Invalid or expired OTP.");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },

  /**
   * @function  registerUser
   * @desc      Create user after verifing otp
   */
  registerUser: async (email) => {
    try {
      const { name, password, createdAt } = await OTPRepository.findUserByEmail(
        email
      );

      const newUser = await userRepository.createUser(
        name,
        email,
        password,
        createdAt
      );
      await OTPRepository.deleteVerifieduser(email); // delete from initial schema

      return { name: newUser.name, email: newUser.email };
    } catch (err) {
      console.error("Error while Registering user  authServices.js: ", err);
      throw err;
    }
  },

  /**
   * @function    loginUser
   * @desc        Login user
   */
  loginUser: async (email, password) => {
    try {
      // Basic validation
      if (!isValidEmail(email)) {
        const error = createError.BadRequest("Invalid email");
        error.details = {
          suggestion: "Enter a valid email address",
          errType: "INVALID_EMAIL",
        };
        throw error;
      }

      // Fetching user and Validation
      const existingUser = await userRepository.findUserByEmailWithPassword(
        email
      );

      if (!existingUser) {
        const error = createError.BadRequest("Invalid email or password");
        error.details = {
          suggestion: "Try reseting your password or try again.",
          errType: "INVALID_CREDINTIALS",
        };
        throw error;
      }

      // Decoding password and validation
      const verifyPassword = await argon2.verify(existingUser.password,password);

      if (!verifyPassword) {
        const error = createError.Unauthorized("Invalid email or password");
        error.details = {
          suggestion: "Try reseting your password or try again.",
          errType: "INVALID_CREDINTIALS",
        };
        throw error;
      }

      // Generate JWT TOKENS
      const { getAccessToken, getRefreshToken } = tokenCreation(existingUser);
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      return {
        user: {
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        },
        accessToken,
        refreshToken,
      };
    } catch (err) {
      console.error("Error while login authServices.js: ", err);
      throw err;
    }
  },
};
