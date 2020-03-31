var express = require('express')
var router = express.Router()
const {signout,signup} = require("../controllers/auth.js")

router.post("/signup", signup);
router.get("/signout" ,signout );

module.exports = router;