const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;

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