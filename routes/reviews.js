const express = require('express');
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;

router.get("/:id", (req, res) => {
    reviewsData.getReviewById(req.params.id).then((review) => {
        res.json(review);
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });
});

router.get("/", (req, res) => {
    reviewsData.getAllReviews().then((reviewList) => {
        res.json(reviewList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

module.exports = router;