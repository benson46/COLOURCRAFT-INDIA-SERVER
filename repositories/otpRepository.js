import OTP from "../model/otpModel.js";
import createError from "../utils/createError.js";

// Repository for handling all initial register related things in database
export const OTPRepository = {
  // Find user by email
  findUserByEmail: async (email) => {
    try {
      return await OTP.findOne({ email });
    } catch (error) {
      console.error("Error finding user by email OTPRepository:", error);
      throw createError.Internal("Database error while finding user by email.");
    }
  },

  // Create a temperory user
  createTempUser: async ({name,email,password,hashedOtp,resendCount,createdAt,}) => {
    try {
      const user = await OTP.findOneAndUpdate(
        { email },
        { $set: { name, email, password, hashedOtp, resendCount, createdAt } },
        { upsert: true, new: true }
      );
      return user.toObject();
    } catch (error) {
      console.error(
        "Error creating/updating temporary user OTPRepository:",
        error
      );
      throw createError.Internal("Error while creating or updating temp user.");
    }
  },

  // Verify the otp of initial user
  verifyUserOtpRegistration: async (email) => {
    try {
      return await OTP.findOne({ email }).select("-password");
    } catch (error) {
      console.error(
        "Error verifying user OTP registration OTPRepository:",
        error
      );
      throw createError.Internal("Database error during OTP verification.");
    }
  },

  // Delete the verified user
  deleteVerifieduser: async (email) => {
    try {
      return await OTP.deleteOne({ email });
    } catch (error) {
      console.error("Error while deleting temp user OTPRepository");
      throw createError.Internal(
        "Database Error during deleting temp user OTPRepository"
      );
    }
  },
};
