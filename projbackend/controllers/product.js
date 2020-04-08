const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
//fs is the file system this is preinstalled

exports.getProductById = (req,res,next ,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Product not found"
            })
        }
        req.product = product;
        next();
    })
}


exports.createProduct = (req,res)=>{
   let form = new formidable.IncomingForm();
   form.keepExtensions = true;

   form.parse(req,(err,fields , file)=>{
       if(err){
           return re.status(400).json({
               error : "Problem with image"
           })
       }
       //destructure the fields
       //like fields.price  so we will use something destructing
       const { name, description ,price ,category ,stock  } = fields;

       if(
           !name ||
           !description ||
           !price ||
           !category ||
           !stock
       ){
            return res.status(400).json({
                error : "Please include all fields"
            })
       }

      
       let product = new Product(fields)

       //Handle file here
       if(file.photo){
           if(file.photo.size > 3000000){
               return res.status(400).json({
                   error : "FIle Size too Bog!!"
               })
           }
           product.photo.data = fs.readFileSync(file.photo.path)
           product.photo.contentType =file.photo.type

       }

       //save to the DB
       product.save((err,product)=>{
           if(err){
               res.status(400).json({
                   error : "Saving tshirt to DB failed"
               })
           }
           res.json(product)
       })

   })
}

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}