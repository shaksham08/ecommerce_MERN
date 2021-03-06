const User = require("../models/user.js");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
   
   const errors = validationResult(req)

   if(!errors.isEmpty()){
       return res.status(422).json({
           error : errors.array()[0].msg
       })
   }
   
    const user = new User(req.body);  //creating the object
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err : "Not able to save use in DB"
            })
        }
        res.json({
            name : user.name,
            email : user.email,
            id: user._id
        });
    });

};


exports.signin = (req,res)=>{
    const errors = validationResult(req)
    const {email,password} = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "User email does not exists"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and password do not match"
            })
        }
        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET)

        //put the token in cookie
        res.cookie("token",token,{expire:new Date()+ 9999});

        //send response to frontend
        const {_id,name,email,role}= user;
       
        return res.json({token,user:{_id,name,email,role}});


    })

}


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User sign out successfully"
    });
};

//protected routes
//we are not writing next because we are using express jwt as it has already
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    //this middleware puts the auth in request so if we return json as req.auth we will get back the id of the signed in person
    userProperty:"auth"
});

exports.isAuthenticated = (req,res,next) => {
    //here req.auth is set efire in isSigned property here this is used to check if he is signed in or not
    let checker = req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role ===0){
        return res.status(403).json({
            error :"You are not ADMIN, Access Denied"
        })
    }
    next();
}




//custom middlewares
