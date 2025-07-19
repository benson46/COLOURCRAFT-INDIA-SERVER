//  @access PRIVATE
import express from 'express';
import { adminAuthController } from '../controller/admin/adminAuthController.js';
import { adminUserMangement } from '../controller/admin/adminUserManagement.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { adminCategoryController } from '../controller/admin/adminCategoryController.js';

const router = express.Router();

// --------------------------------------------------------------------------------------
// ADMIN AUTH ROUTES 

// @route POST api/admin/login
router.post('/login',adminAuthController.login);

// --------------------------------------------------------------------------------------

// ADMIN USER MANAGEMENT

// @route GET api/admin/user-list 
// @desc Get all users 
router.get('/user-list',verifyToken("admin"),adminUserMangement.listUsers);

// @route PATCH api/admin/user-toogle-status/:email
// @desc  Update user status with email(block/unblock)
router.patch('/user-toogle-status/:email',verifyToken("admin"),adminUserMangement.tooglingUser)

// --------------------------------------------------------------------------------------

// CATEGORY MANAGEMENT

// route POST api/admin/category
// @desc Create a new category 
router.route('/category').get(adminCategoryController.gettingAllCategory).post(adminCategoryController.addingNewCategory)

export default router;