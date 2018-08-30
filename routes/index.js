var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/", function (req, res) {
    res.render("landing");
});



//===========================================================================
//Auth Route
//===========================================================================

//Show Register Form
router.get("/register",function(req,res){
    res.render("register");
});


//Handle Signup Logic
router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
       if(err){
        console.log(err);
        return res.render("register");
       } 
       passport.authenticate("local")(req,res,function(){
        res.redirect("/campgrounds");
       });
    });
});

//Show Login form

router.get("/login",function(req,res){
    res.render("login");
});

//Handles Login Logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req,res){

    //Just left to aware that we have a middleware hehehe
    
});


//Logout
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");

});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;