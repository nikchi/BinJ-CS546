const express = require('express');
const router = express.Router();
const users = require('../data/users');
var passport = require('passport');

router.get("/",function(req,res){
    //If there is an authenticated user redirect to the private page
    if( req.user ){
        res.redirect("/private");
    }else{
        var error = false;
        //If there is an error in the query send an error string with the page
        if( req.query.error == "wrongInfo" ){
            error = "Invalid user name or password.";
        }
        if( req.query.error == "noAuth" ){
            error = "No user authenticated, log in to view your private page.";
        }
        res.render("login",{ "error":error });
    }

});
router.get("/private",function(req,res){
    //If there is a user authenticated server private page with user data
    if( req.user ){
        res.render("private",{"name":req.user,"data":users[req.user]});
    //If not redirect to root with an error query
    }else{
        res.redirect("/?error=noAuth")
    }
});

//authenticate at login
router.post("/login", passport.authenticate('local', {
    successRedirect: '/private',
    failureRedirect: '/?error=wrongInfo'
}));

module.exports = router;