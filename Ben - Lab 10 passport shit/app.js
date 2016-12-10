const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const express = require("express");
const session = require('express-session');
const passport = require('passport')  
const localStrategy = require('passport-local').Strategy
const users = require("./data/users");
const bcrypt = require("bcrypt-node");
const app = express();
const static = express.static(__dirname + '/public');

const path = require("path");

const configRoutes = require("./routes");

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

const rounds = 8;
const salt = bcrypt.genSaltSync(rounds);

app.use(cookieParser('cs546'));
app.use(session({ secret: 'cs546', saveUninitialized: true, resave: true }));
app.use(passport.initialize());  
app.use(passport.session());

//Local Strategy
passport.use( new localStrategy(
    function( username, password, done){
        if( !users[username] ){
            return done(null,false);
        }
        //Check if password matches has in database
        if( !bcrypt.compareSync( password, users[username].password ) ){
            return done(null,false);
        }
        //Return password
        return done( null, users[username].password );
    }
));
    
passport.serializeUser(function (username, callback) {
    callback(null, username)
});

passport.deserializeUser(function (password, callback) {
    //Find the user with the given password and return
    for( var user in users ){
        if( users[user].password == password ){
            callback(null,user);
            return;
        }
    }
    callback(null,null);

});

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});