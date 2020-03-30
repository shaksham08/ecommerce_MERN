const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ProductCartSchema  = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref:"Product"
    },
    //below will things which we want to show in the cart
    name :String, //from product we will get the name
    count:Number, //how many product we are ordering 
    price:Number,//totat price of total units

});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema)


//we can also call it as orderschema or cart
const OrderSchema = new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id : {},
    amount: {type:Number},
    address: String,
    updated : Date,
    user : {
        type: ObjectId,
        ref : "User"
    }
},{timestamps = true});


const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order,ProductCart};


