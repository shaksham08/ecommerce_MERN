const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCatgories} = require("../controllers/product")
const { getUserById} = require("../controllers/user")

//all of the params
router.param("userId",getUserById);
router.param("productId",getProductById);


//all of the actual routers
//create route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin,createProduct);

//read routes
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//delete routes
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)


//update routes
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)



//listing route
router.get("/products",getAllProducts)

router.get("/products/categories" , getAllUniqueCatgories)

module.exports = router;