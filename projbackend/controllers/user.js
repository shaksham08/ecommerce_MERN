const User = require("../models/user");
const Order = require("../models/order")

//this works with the params
exports.getUserById = (req,res,next , id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "No user was found in DB"
            })
        }
        //creating an object inside the req to store the details of user 
        req.profile = user;
        next();  
    })
}



//this is simple if someone calls then we will return the details
exports.getUser = (req,res) =>{
    //TODO: Get back here for password
    //DONE: Now this was only th ebug of undefined
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    
    return res.json(req.profile);
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new : true , useFindAndModify : false},
        (err,user) =>{
            if(err){
                return res.status(400).json({
                    error : "you are not authorised to update the user"
                })
            }

            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}


exports.userPurchaseList = (req,res) =>{
    Order.find({user : req.profile._id})
    //what model you want to update and what field you want to bring in 
    .populate("user" , "_id name")
    //here are 2 field _id and name
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error : "No order in this account"
            })
        }
        return res.json(order)
    })

}



exports.pushOrderInPurchaseList = (req,res,next) =>{

    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description ,
            category : product.category,
            quantity : product.quantity,
            amount : req.body.order.amount,
            transaction_id :req.body.order.transaction_id
        })
    });

    //Store this is DB
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push : {purchases : purchases}},
        {new: true},
        //send me the updated one which is new and not one th eold
        (err , purchases) =>{
            if(err){
                return res.status(400).json({
                    error : "Unable to save purchase list"
                })
            }
            next()
        }
    )

    
}



