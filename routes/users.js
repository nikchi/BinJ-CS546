const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const passport = require('passport');

router.get("/login", (req, res) => {
  if (req.isAuthenticated())
    res.redirect("/users/" + req.user._id);
  else
    res.render("users/login", { error: req.flash('error') });
});

router.post("/login", passport.authenticate('local', { successRedirect: "/", failureRedirect: "/users/login", failureFlash: true }));

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/new", (req, res) => {
  if (req.body.password !== req.body.confirm) {
    res.render("users/new", { error: "Confirmation must match password" });
    return;
  }

  userData.addUser(req.body.username, req.body.password, req.body.profile_picture, req.body.bio).then((user) => {
    res.redirect("/users/" + user._id);
  }).catch((e) => {
    res.render("users/new", { error: e });
  });
});

router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });
});

router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    let userInfo = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create a user" });
        return;
    }

    if (!userInfo.username) {
        res.status(400).json({ error: "You must provide a username" });
        return;
    }

    if (!userInfo.hashedPassword) {
        res.status(400).json({ error: "You must provide a hashedPassword" });
        return;
    }

    if (!userInfo.profilePicture) {
        res.status(400).json({ error: "You must provide a profilePicture" });
        return;
    }

    if (!userInfo.bio) {
        res.status(400).json({ error: "You must provide a bio" });
        return;
    }

    userData.addUser(userInfo.username, userInfo.hashedPassword, userInfo.profilePicture, userInfo.bio)
        .then((newUser) => {
            res.json(newUser);
        }, () => {
            res.sendStatus(500);
        });
});

module.exports = router;
