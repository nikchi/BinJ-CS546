const express = require('express');
const router = express.Router();
const data = require("../data");
const showsData = data.shows;

router.get("/:id", (req, res) => {
    showsData.getShowByName(req.params.id).then((show) => {
        res.render('single', { show: show});
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

router.post("/", (req, res) => {
    showsData.addReviewToShowByName(req.body.showName, req.body.poster, req.body.title, req.body.body);
	res.json({success: true});
});

router.post("/:id/up", (req, res) => {

});
module.exports = router;
