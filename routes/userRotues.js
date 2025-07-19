import express from "express";

import { authController } from "../controller/user/authController.js";

const router = express.Router();

// --------------------------------------------------------------------------------------

// USER AUTH ROUTES ( @access PUBLIC)

// @route   POST api/user/initiate-register
router.post("/initiate-register", authController.initiateRegister);
// @rotue POST api/user/verify-otp
router.post("/verify-otp", authController.verifyOtp);
// @route   POST api/user/login
router.post("/login", authController.login);

// --------------------------------------------------------------------------------------



export default router;
