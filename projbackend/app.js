require('dotenv').config()
const express = require("express");
const app = express();


const mongoose = require('mongoose');

//process is where we attactch the new dependencies
//env is the file we created 
//DATABASE IS THE NAME WE HAVE GIVEN FOR THE VARIABLE

//WE DONT WANT THE PAYMENT OR OTHER DATA GETS EXPOSED SO
//IF OUR SOURCE CODE IS ALSO EXPOSED , WE WILL BE SAFE
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch(()=>{
    console.log("db GOT OPPS!!!");
})
//we can use function().then().cathch()
//then() this is when it ran correctly
//catch() for some error
const port = process.env.port || 8000;
app.listen(port , ()=>{
    console.log(`app is running at ${port}`);
});