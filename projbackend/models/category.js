const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    }
},
 {timestamps:true}

); 
 //whener we create these schema it records the time and store it in the database for us
// we can use filter using this time stamp and we can sort out things when it was created

module.exports = mongoose.model("Category", categorySchema);
