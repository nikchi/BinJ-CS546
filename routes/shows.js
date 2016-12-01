const express = require('express');
const router = express.Router();
const data = require("../data");
const showsData = data.shows;

router.get("/:id", (req, res) => {
    showsData.getShowById(req.params.id).then((show) => {
        res.render('single', { show: show });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

router.get("/", (req, res) => {
    showsData.getAllShows().then((showList) => {
        res.render('list', { shows: showList });
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

module.exports = router;