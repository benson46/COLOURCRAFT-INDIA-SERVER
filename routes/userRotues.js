/**
 * @access PUBLIC
*/ 
import express from "express";

import { authController } from "../controller/user/authController.js";

const router = express.Router();

// ============================================================================
// USER AUTH ROUTES
// ============================================================================

/**
 * @route   POST /api/user/initiate-register
 * @desc    Initiate user registration with phone/email and send OTP
 */
router.post("/initiate-register", authController.initiateRegister);

/**
 * @route   POST /api/user/verify-otp
 * @desc    Verify OTP and complete user registration
 */
router.post("/verify-otp", authController.verifyOtp);


/**
 * @route   POST /api/user/login
 * @desc    User login with credentials (email/phone & password)
 */
router.post("/login", authController.login);


// ============================================================================
// USER AUTH ROUTES
// ============================================================================


export default router;
