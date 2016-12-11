const express = require('express');
const router = express.Router();
const data = require("../data");
const showsData = data.shows;
const passport = require('passport');

router.get("/:id", (req, res) => {
  var poster = req.isAuthenticated() ? req.user.username : "Anonymous";
    showsData.getShowByName(req.params.id).then((show) => {
        res.render('single', { show: show, poster: poster});
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
  var poster = "Anonymous";
  if (req.isAuthenticated())
    poster = req.user.username;

  console.log(req.user);
  showsData.addReviewToShowByName(req.body.showName, poster, req.body.title, req.body.body, req.body.rating);
	res.json({success: true});
});

router.post("/up", (req, res) => {
	showsData.changeReviewRateUp(req.body.showName, req.body.reviewId);
	res.json({success: true});
});

router.post("/down", (req, res) => {
	showsData.changeReviewRateDown(req.body.showName, req.body.reviewId);
	res.json({success: true});
});
module.exports = router;
