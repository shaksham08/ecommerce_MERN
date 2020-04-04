const User = require("../models/user");

exports.getUserById = (req,res,next , id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "No user was found in DB"
            })
        }
        //creating an object inside the req
        req.profile = user;
        next();  
    })
}

exports.getUser = (req,res) =>{
    //TODO: Get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    
    return res.json(req.profile);
}