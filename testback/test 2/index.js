const express = require("express");

const app = express();
const port = 8000;


const admin = (req,res)=>{
    return res.send("admin dashboard");
};

const isAdmin = (req,res,next) =>{
    console.log("isAdmin is runing")
    next();
}

const isloggedIn= (req, res, next) => {
    console.log("islogged is runing")
    next();
}


app.get("/admin",isloggedIn,isAdmin,admin);



app.get("/" , (req,res) => {
    return res.send("You are in / route");
});

app.get("/login", (req, res) => {
    return res.send("You are in login route");
});


app.get("/register", (req, res) => {
    return res.send("You are in register route");
});

app.get("/signin", (req, res) => {
    return res.send("You are in signin route");
});

app.get("/signout", (req, res) => {
    return res.send("You are in signout route");
});




app.listen(port, () => {
    console.log("Server is running ....");
});