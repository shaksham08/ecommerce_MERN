const User = require("../models/user.js");


exports.signup = (req, res) => {
    const user = new User(req.body);
};


exports.signout = (req, res) => {
    res.json({
        message: "User sign out"
    });
};


