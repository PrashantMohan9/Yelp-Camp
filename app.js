var express               = require("express");
var app                   = express();
var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var Campground            = require("./models/campground");
var Comment               = require("./models/comment");
var seedDB                = require("./seeds");
var passport              = require("passport");
var LocalStrategy         = require("passport-local");
var methodOverride        = require("method-override");
var User                  = require("./models/user");
var passportLocalMongoose = require("passport-local-mongoose");


var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");



mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//To seed Data
//seedDB();

//Passport Config

app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});


app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(9000, function () {
    console.log("Server Has Started!")
});


// Campground.create(
// {
//     name:"Salmon Creek",
//     image:"https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//     description:"This is a huge salmon hill it is insanely awesome aww yeah"
// }
// ,function(err,campground){

//     if(err){
//         console.log("Something Went Wrong");
//         console.log(err);
//     }
//     else
//     {
//         console.log("New Campground Created");
//         console.log(campground);
//     }
// });
