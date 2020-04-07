const express = require("express")
const router = express.Router()

const { getCategoryById, createCategory, getAllCategory, getCategory, updateCategory} = require("../controllers/category")
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//params
router.param("userId", getUserById)

router.param("categoryId",getCategoryById);


//actual routes goes here

//create routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

//read route
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)

//update
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)


//delete


module.exports = router;