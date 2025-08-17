/**
 * @access PRIVATE
 *  */ 
import express from "express";

import { adminAuthController } from "../controller/admin/adminAuthController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { adminUserMangement } from "../controller/admin/adminUserManagement.js";
import { adminCategoryController } from "../controller/admin/adminCategoryController.js";
import { adminProductController } from "../controller/admin/adminProductController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();


// ============================================================================
// ADMIN AUTH ROUTES
// ============================================================================


/**
 * @route   POST /api/admin/login
 * @desc    Admin login
 */
router.post("/login", adminAuthController.login);


/**
 * @route   POST /api/admin/logout
 * @desc    Admin logout
 */
router.post("/logout", adminAuthController.logout);



// ============================================================================
// ADMIN USER MANAGEMENT
// ============================================================================


/**
 * @route   GET /api/admin/user-list
 * @desc    Get all registered users
 */
router.get("/user-list", verifyToken("admin"), adminUserMangement.fetchUsers);


/**
 * @route   PATCH /api/admin/user-toogle-status/:email
 * @desc    Toggle block/unblock status of a user by email
 */
router.patch(
  "/user-toogle-status/:email",
  verifyToken("admin"),
  adminUserMangement.tooglingUser
);

// ============================================================================
// CATEGORY MANAGEMENT
// ============================================================================

/**
 * @route   POST /api/admin/category
 * @desc    Add a new category
 *
 * @route   GET /api/admin/category
 * @desc    Get all categories
 */
router
  .route("/category")
  .post(verifyToken("admin"), adminCategoryController.addingNewCategory)
  .get(verifyToken("admin"), adminCategoryController.fetchingAllCategory);


/**
 * @route   PATCH /api/admin/category-tootgle-status/:_id
 * @desc    Toggle block/unblock status of a category by ID
 */
router.patch(
  "/category-tootgle-status/:_id",
  verifyToken("admin"),
  adminCategoryController.tooglingCategory
);


/**
 * @route   PATCH /api/admin/category/:id
 * @desc    Edit a category's title
 */
router.patch(
  "/category/:id",
  verifyToken("admin"),
  adminCategoryController.editingCategory
);


// ============================================================================
// PRODUCT MANAGEMENT
// ============================================================================

/**
 * @route   POST /api/admin/product
 * @desc    Add new product
 *
 * @route   GET /api/admin/product
 * @desc    Get all products
 */
router
  .route("/product")
  .post(
    verifyToken("admin"),
    upload.array("images", 15),
    adminProductController.addingNewProduct
  )
  .get(verifyToken("admin"), adminProductController.fetchingProducts);


/**
 *  @route    PATCH /api/admin/product/:id
 *  @desc     Block or Unblock a product
 * 
 * @route     PUT /api/admin/product/:id
 * @desc      Edit a product
 */
router
  .route("/product/:id")
  .patch(verifyToken("admin"), adminProductController.tooglingStatus)
  .put(
    verifyToken("admin"),
    upload.array("images", 15),
    adminProductController.editingProduct
  );

export default router;
