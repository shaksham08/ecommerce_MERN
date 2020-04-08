const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const { getProductById, createProduct} = require("../controllers/product")
const {getUserById} = require("../controllers/user")

//all of the params
router.param("userId",getUserById);
router.param("productId",getProductById);


//all of the actual routers
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin,createProduct);


module.exports = router;