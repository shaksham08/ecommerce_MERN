const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {} = require("../controllers/product")
const {getUserById} = require("../controllers/user")

//all of the params
router.param("userId",getUserById);
router.param("productId",getProductById);


//all of the actual routers


module.exports = router;